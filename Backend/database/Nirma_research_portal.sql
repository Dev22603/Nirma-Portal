PGDMP      /                |            Nirma_research_portal    16.4    16.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16430    Nirma_research_portal    DATABASE     �   CREATE DATABASE "Nirma_research_portal" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
 '   DROP DATABASE "Nirma_research_portal";
                postgres    false            �            1259    16440    book_chapters    TABLE     '   CREATE TABLE public.book_chapters (
);
 !   DROP TABLE public.book_chapters;
       public         heap    postgres    false            �            1259    16431    conference_paper    TABLE     *   CREATE TABLE public.conference_paper (
);
 $   DROP TABLE public.conference_paper;
       public         heap    postgres    false            �            1259    16437    journal_paper    TABLE     �  CREATE TABLE public.journal_paper (
    id integer NOT NULL,
    "Paper Title" character varying(255),
    "FileName" character varying(255),
    "Name of Journal" character varying(255),
    "JournalType" character varying(255),
    "Impact Factor (Clarivate Analytics)" numeric(5,2),
    "Impact Factor (Journal)" numeric(5,2),
    "Year of Publication" integer,
    "Month of Publication" integer,
    "IndexIn" character varying(255),
    "ISSN No" character varying(20),
    "Volume No" character varying(10),
    "Issue No" character varying(10),
    "Page No" character varying(20),
    "Author1" character varying(255),
    "Author2" character varying(255),
    "Author3" character varying(255),
    "Author4" character varying(255),
    "Author5" character varying(255),
    "Author6" character varying(255),
    "Author7" character varying(255),
    "Author8" character varying(255),
    "Author9" character varying(255),
    "Author10" character varying(255),
    "WebsiteJournalLink" character varying(255),
    "ArticleLink" character varying(255),
    "Institute Name" character varying(255),
    "Department Name" character varying(255)
);
 !   DROP TABLE public.journal_paper;
       public         heap    postgres    false            �            1259    16443    journal_paper_id_seq    SEQUENCE     �   CREATE SEQUENCE public.journal_paper_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.journal_paper_id_seq;
       public          postgres    false    217            �           0    0    journal_paper_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.journal_paper_id_seq OWNED BY public.journal_paper.id;
          public          postgres    false    219            �            1259    16434    research_paper    TABLE     (   CREATE TABLE public.research_paper (
);
 "   DROP TABLE public.research_paper;
       public         heap    postgres    false            \           2604    16444    journal_paper id    DEFAULT     t   ALTER TABLE ONLY public.journal_paper ALTER COLUMN id SET DEFAULT nextval('public.journal_paper_id_seq'::regclass);
 ?   ALTER TABLE public.journal_paper ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    217            �          0    16440    book_chapters 
   TABLE DATA           '   COPY public.book_chapters  FROM stdin;
    public          postgres    false    218   j       �          0    16431    conference_paper 
   TABLE DATA           *   COPY public.conference_paper  FROM stdin;
    public          postgres    false    215   �       �          0    16437    journal_paper 
   TABLE DATA           �  COPY public.journal_paper (id, "Paper Title", "FileName", "Name of Journal", "JournalType", "Impact Factor (Clarivate Analytics)", "Impact Factor (Journal)", "Year of Publication", "Month of Publication", "IndexIn", "ISSN No", "Volume No", "Issue No", "Page No", "Author1", "Author2", "Author3", "Author4", "Author5", "Author6", "Author7", "Author8", "Author9", "Author10", "WebsiteJournalLink", "ArticleLink", "Institute Name", "Department Name") FROM stdin;
    public          postgres    false    217   �       �          0    16434    research_paper 
   TABLE DATA           (   COPY public.research_paper  FROM stdin;
    public          postgres    false    216   �       �           0    0    journal_paper_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.journal_paper_id_seq', 2, true);
          public          postgres    false    219            ^           2606    16446     journal_paper journal_paper_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.journal_paper
    ADD CONSTRAINT journal_paper_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.journal_paper DROP CONSTRAINT journal_paper_pkey;
       public            postgres    false    217            �      x������ � �      �      x������ � �      �   %  x�m�KN�0E�/����Χ�YKj�j��t�&��ؑ㶰{��ZA$�{=��P��VH^y���I���.�Q]~���d5W���-$Q���`1K ��.�eIf��)��}�4�ak�&k���ɾ�N���:�����2q�sus?���>�Qa�?�N
�f�э���p�X�oj�)l6`�{����r�%^ ��ܣ�����fp���a�&h�/���J�;��ae���5���ǭ�Y�d�x���T?��"��1��~֔���U1B\]�ɍ�C�/���1      �      x������ � �     