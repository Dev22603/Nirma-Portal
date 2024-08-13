import pandas as pd
import os
from sqlalchemy import create_engine, text
from sqlalchemy.exc import OperationalError
import psycopg2
from dotenv import load_dotenv
load_dotenv()
folder_path = 'excel files'
dataframes_dict = {}

for filename in os.listdir(folder_path):
    if filename.endswith('.xlsx') or filename.endswith('.xls'):
        file_path = os.path.join(folder_path, filename)    
        df = pd.read_excel(file_path,None) 
        dataframes_dict[filename] = df
        
del dataframes_dict['Journal_Papers.xlsx']['Summary of 2022-23']
excel_files=list(dataframes_dict.keys())
def split_authors(df, column_name, max_authors=10):
    if column_name in df.columns:
        df.loc[:,column_name] = df[column_name].str.strip().str.replace(r',+', ',', regex=True).str.rstrip(',')
    else:
        return df

    # Split the 'author' column into lists of authors
    authors_split = df[column_name].str.split(',', expand=True)
    print(authors_split.shape[0])
    print(authors_split.shape[1])
    # Rename columns to 'author_1', 'author_2', ..., 'author_10'
    authors_split.columns = [f'{column_name}{i+1}' for i in range(authors_split.shape[1])]
    
    # If there are less columns than max_authors, add additional columns with None
    for i in range(authors_split.shape[1], max_authors):
        authors_split[f'{column_name}{i+1}'] = None
    
    # Trim to max_authors columns
    authors_split = authors_split.iloc[:, :max_authors]
    
    # Drop the original 'author' column and concatenate the new columns
    df = df.drop(columns=[column_name])
    df = pd.concat([df, authors_split], axis=1)
    
    return df


def drop_database(db_name):
    # Connect to the 'postgres' database as a superuser or a user with sufficient privileges
    conn = psycopg2.connect(
        dbname='postgres',
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        port=os.getenv('DB_PORT')
    )
    conn.autocommit = True
    cursor = conn.cursor()
    
    try:
        cursor.execute(f"DROP DATABASE IF EXISTS \"{db_name}\"")
        print(f"Database \"{db_name}\" dropped successfully.")
    except Exception as e:
        print(f"Error dropping database \"{db_name}\": {e}")
    finally:
        cursor.close()
        conn.close()





# Function to check if the database exists
def database_exists(db_name):
    conn = psycopg2.connect(
        dbname='postgres',
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        host=os.getenv('DB_HOST'),
        port=os.getenv('DB_PORT')
    )
    conn.autocommit = True
    cursor = conn.cursor()
    cursor.execute(f"SELECT 1 FROM pg_database WHERE datname = '{db_name}'")
    exists = cursor.fetchone() is not None
    cursor.close()
    conn.close()
    return exists



# Function to create the database if it doesn't exist
def create_database(db_name):
    if not database_exists(db_name):
        conn = psycopg2.connect(
            dbname='postgres',
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            host=os.getenv('DB_HOST'),
            port=os.getenv('DB_PORT')
        )
        conn.autocommit = True
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE {db_name}")
        print(f"Database {db_name} created successfully.")
        cursor.close()
        conn.close()
    else:
        print(f"Database {db_name} already exists.")
        drop_database(db_name)
        create_database(db_name)


# Function to create a PostgreSQL database and insert data into tables
def create_db_and_insert_data(db_name, sheet_data):
    # Create a connection to PostgreSQL
    default_engine = create_engine(f'postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/postgres')
    
    # Try to create the database if it doesn't exist
    try:
        create_database(db_name)
    except OperationalError as e:
        if "already exists" in str(e):
            print(f"Database {db_name} already exists.")
            
        else:
            print(e)
            
    
    # Create an engine for the new database
    engine = create_engine(f'postgresql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{db_name}')
    
    # Loop through each sheet and create a table in the database
    for sheet_name, df in sheet_data.items():
        print(sheet_name)
        df.to_sql(sheet_name, engine, if_exists='replace', index=False)



for i in excel_files:
    for df in dataframes_dict[i]:
        dataframes_dict[i][df]=split_authors(dataframes_dict[i][df], 'Author', max_authors=10)


for i in excel_files:
    create_db_and_insert_data(i[0:-5].lower(),dataframes_dict[i])