PGDMP  1                     |            Nirma_portal    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16412    Nirma_portal    DATABASE     �   CREATE DATABASE "Nirma_portal" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Nirma_portal";
                postgres    false            �           0    0    DATABASE "Nirma_portal"    COMMENT     M   COMMENT ON DATABASE "Nirma_portal" IS 'research portal relared information';
                   postgres    false    4845            �            1259    16420    conference_paper    TABLE       CREATE TABLE public.conference_paper (
    "Id" numeric NOT NULL,
    "Conference paper name" character varying(60) NOT NULL,
    "Publiced date" date NOT NULL,
    "Authors' name" character varying(60) NOT NULL,
    "Country" character varying NOT NULL
);
 $   DROP TABLE public.conference_paper;
       public         heap    postgres    false            �           0    0    TABLE conference_paper    COMMENT     T   COMMENT ON TABLE public.conference_paper IS 'conference paper related information';
          public          postgres    false    216            �            1259    16413    research_paper    TABLE     �   CREATE TABLE public.research_paper (
    "Id" numeric NOT NULL,
    "Research paper name" character varying(60) NOT NULL,
    "Publiced date" date NOT NULL,
    "Authors' name" character varying(60) NOT NULL,
    "Country" character varying NOT NULL
);
 "   DROP TABLE public.research_paper;
       public         heap    postgres    false            �           0    0    TABLE research_paper    COMMENT     P   COMMENT ON TABLE public.research_paper IS 'research paper related information';
          public          postgres    false    215            �          0    16420    conference_paper 
   TABLE DATA           v   COPY public.conference_paper ("Id", "Conference paper name", "Publiced date", "Authors' name", "Country") FROM stdin;
    public          postgres    false    216   !       �          0    16413    research_paper 
   TABLE DATA           r   COPY public.research_paper ("Id", "Research paper name", "Publiced date", "Authors' name", "Country") FROM stdin;
    public          postgres    false    215   _       V           2606    16426 &   conference_paper conference_paper_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.conference_paper
    ADD CONSTRAINT conference_paper_pkey PRIMARY KEY ("Id");
 P   ALTER TABLE ONLY public.conference_paper DROP CONSTRAINT conference_paper_pkey;
       public            postgres    false    216            T           2606    16419 "   research_paper research_paper_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.research_paper
    ADD CONSTRAINT research_paper_pkey PRIMARY KEY ("Id");
 L   ALTER TABLE ONLY public.research_paper DROP CONSTRAINT research_paper_pkey;
       public            postgres    false    215            �   .  x�E��j�0��뜧�6zb�w�s������͙�,IKl�~�.'��"����;5&�)I�L2�Լk�:P�s�Q-L+Hs��z"O�0�59'�O�P��G�46ݖs�r�6����(���\��G;�Ď�*�?G�u�1'n�6-�+L�Ƥ&����7Ty�F�Q�o�r��y��Df�n�$g�șڙ�4��/΀Y�[j��1�������S�9@����O!��Q�/�0P�y���\rZ��p�+�쳻����8|Z�(��F�U�|a�O����(����'���1Mħ�����# ���v      �   �   x�E�9�0���>���̾'4t4�@���C�<�rF_�kqX���.F��S�SFd����}��|[�����dr�`�)`��MH��	a*6�
&����dj��a��i`��MJ��Ia:g�"Ӊ� �/z�Do��X�ƃTxd�
�VP߉��;YAug��l�]X���&N{)�Yk�     