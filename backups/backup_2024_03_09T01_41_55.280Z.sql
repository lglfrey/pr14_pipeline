PGDMP     7    )        	        |            todo    14.5    14.5 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    121322    todo    DATABASE     a   CREATE DATABASE todo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
    DROP DATABASE todo;
                postgres    false            �            1259    129650    Cheque    TABLE     t  CREATE TABLE public."Cheque" (
    id integer NOT NULL,
    payment double precision NOT NULL,
    "accountNumber" character varying(255) NOT NULL,
    "userId" integer NOT NULL,
    "chequeTypeId" integer NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Cheque";
       public         heap    postgres    false            �            1259    129640 
   ChequeType    TABLE       CREATE TABLE public."ChequeType" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."ChequeType";
       public         heap    postgres    false            �            1259    129639    ChequeType_id_seq    SEQUENCE     �   CREATE SEQUENCE public."ChequeType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."ChequeType_id_seq";
       public          postgres    false    220            �           0    0    ChequeType_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."ChequeType_id_seq" OWNED BY public."ChequeType".id;
          public          postgres    false    219            �            1259    129649    Cheque_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Cheque_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Cheque_id_seq";
       public          postgres    false    222            �           0    0    Cheque_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Cheque_id_seq" OWNED BY public."Cheque".id;
          public          postgres    false    221            �            1259    129570    Country    TABLE     2  CREATE TABLE public."Country" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "countryCode" character varying(255) NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Country";
       public         heap    postgres    false            �            1259    129569    Country_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Country_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Country_id_seq";
       public          postgres    false    212            �           0    0    Country_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Country_id_seq" OWNED BY public."Country".id;
          public          postgres    false    211            �            1259    129678    File    TABLE     H  CREATE TABLE public."File" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    uri character varying(255) NOT NULL,
    "fileTypeId" integer NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."File";
       public         heap    postgres    false            �            1259    129668    FileType    TABLE        CREATE TABLE public."FileType" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."FileType";
       public         heap    postgres    false            �            1259    129667    FileType_id_seq    SEQUENCE     �   CREATE SEQUENCE public."FileType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."FileType_id_seq";
       public          postgres    false    224            �           0    0    FileType_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."FileType_id_seq" OWNED BY public."FileType".id;
          public          postgres    false    223            �            1259    129677    File_id_seq    SEQUENCE     �   CREATE SEQUENCE public."File_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."File_id_seq";
       public          postgres    false    226            �           0    0    File_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."File_id_seq" OWNED BY public."File".id;
          public          postgres    false    225            �            1259    129824    Journal    TABLE       CREATE TABLE public."Journal" (
    id integer NOT NULL,
    content character varying(255) NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Journal";
       public         heap    postgres    false            �            1259    129823    Journal_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Journal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."Journal_id_seq";
       public          postgres    false    242            �           0    0    Journal_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public."Journal_id_seq" OWNED BY public."Journal".id;
          public          postgres    false    241            �            1259    129584    Subscription    TABLE     {  CREATE TABLE public."Subscription" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    logo character varying(255) NOT NULL,
    "subscriptionTypeId" integer NOT NULL,
    "countryId" integer NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 "   DROP TABLE public."Subscription";
       public         heap    postgres    false            �            1259    129558    SubscriptionType    TABLE     Z  CREATE TABLE public."SubscriptionType" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    cost double precision NOT NULL,
    duration character varying(255) NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 &   DROP TABLE public."SubscriptionType";
       public         heap    postgres    false            �            1259    129557    SubscriptionType_id_seq    SEQUENCE     �   CREATE SEQUENCE public."SubscriptionType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public."SubscriptionType_id_seq";
       public          postgres    false    210            �           0    0    SubscriptionType_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."SubscriptionType_id_seq" OWNED BY public."SubscriptionType".id;
          public          postgres    false    209            �            1259    129583    Subscription_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Subscription_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public."Subscription_id_seq";
       public          postgres    false    214            �           0    0    Subscription_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Subscription_id_seq" OWNED BY public."Subscription".id;
          public          postgres    false    213            �            1259    129695    Task    TABLE     &  CREATE TABLE public."Task" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    advance double precision NOT NULL,
    cost double precision NOT NULL,
    "startDatetime" timestamp with time zone NOT NULL,
    "endDatetime" timestamp with time zone NOT NULL,
    "authorId" integer NOT NULL,
    "workerId" integer NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Task";
       public         heap    postgres    false            �            1259    129715    TaskComment    TABLE     %  CREATE TABLE public."TaskComment" (
    id integer NOT NULL,
    content character varying(255) NOT NULL,
    "taskId" integer NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."TaskComment";
       public         heap    postgres    false            �            1259    129714    TaskComment_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TaskComment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."TaskComment_id_seq";
       public          postgres    false    230            �           0    0    TaskComment_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."TaskComment_id_seq" OWNED BY public."TaskComment".id;
          public          postgres    false    229            �            1259    129738    TaskJournal    TABLE     =  CREATE TABLE public."TaskJournal" (
    id integer NOT NULL,
    comment character varying(255),
    "taskId" integer NOT NULL,
    "statusId" integer NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 !   DROP TABLE public."TaskJournal";
       public         heap    postgres    false            �            1259    129737    TaskJournal_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TaskJournal_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."TaskJournal_id_seq";
       public          postgres    false    234            �           0    0    TaskJournal_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public."TaskJournal_id_seq" OWNED BY public."TaskJournal".id;
          public          postgres    false    233            �            1259    129728 
   TaskStatus    TABLE       CREATE TABLE public."TaskStatus" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."TaskStatus";
       public         heap    postgres    false            �            1259    129727    TaskStatus_id_seq    SEQUENCE     �   CREATE SEQUENCE public."TaskStatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public."TaskStatus_id_seq";
       public          postgres    false    232            �           0    0    TaskStatus_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."TaskStatus_id_seq" OWNED BY public."TaskStatus".id;
          public          postgres    false    231            �            1259    129694    Task_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Task_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Task_id_seq";
       public          postgres    false    228            �           0    0    Task_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Task_id_seq" OWNED BY public."Task".id;
          public          postgres    false    227            �            1259    129756    Todo    TABLE       CREATE TABLE public."Todo" (
    id integer NOT NULL,
    description character varying(255) NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Todo";
       public         heap    postgres    false            �            1259    129755    Todo_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Todo_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."Todo_id_seq";
       public          postgres    false    236            �           0    0    Todo_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."Todo_id_seq" OWNED BY public."Todo".id;
          public          postgres    false    235            �            1259    129616    User    TABLE     �  CREATE TABLE public."User" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    "countryId" integer NOT NULL,
    "userRoleId" integer NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    129606    UserRole    TABLE        CREATE TABLE public."UserRole" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."UserRole";
       public         heap    postgres    false            �            1259    129605    UserRole_id_seq    SEQUENCE     �   CREATE SEQUENCE public."UserRole_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public."UserRole_id_seq";
       public          postgres    false    216            �           0    0    UserRole_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."UserRole_id_seq" OWNED BY public."UserRole".id;
          public          postgres    false    215            �            1259    129807    UserSubscriptions    TABLE     �   CREATE TABLE public."UserSubscriptions" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL,
    "SubscriptionId" integer NOT NULL
);
 '   DROP TABLE public."UserSubscriptions";
       public         heap    postgres    false            �            1259    129615    User_id_seq    SEQUENCE     �   CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public."User_id_seq";
       public          postgres    false    218            �           0    0    User_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;
          public          postgres    false    217            �            1259    129763 
   UsersFiles    TABLE     ;  CREATE TABLE public."UsersFiles" (
    "userId" integer NOT NULL,
    "fileId" integer NOT NULL,
    "logicalDelete" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer NOT NULL,
    "FileId" integer NOT NULL
);
     DROP TABLE public."UsersFiles";
       public         heap    postgres    false            �            1259    129790    UsersSubscriptions    TABLE     �  CREATE TABLE public."UsersSubscriptions" (
    id integer NOT NULL,
    "beginDatetime" timestamp with time zone NOT NULL,
    "endDatetime" timestamp with time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "userId" integer NOT NULL,
    "subscriptionId" integer NOT NULL,
    "logicalDelete" boolean NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 (   DROP TABLE public."UsersSubscriptions";
       public         heap    postgres    false            �            1259    129789    UsersSubscriptions_id_seq    SEQUENCE     �   CREATE SEQUENCE public."UsersSubscriptions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public."UsersSubscriptions_id_seq";
       public          postgres    false    239            �           0    0    UsersSubscriptions_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."UsersSubscriptions_id_seq" OWNED BY public."UsersSubscriptions".id;
          public          postgres    false    238            �           2604    129653 	   Cheque id    DEFAULT     j   ALTER TABLE ONLY public."Cheque" ALTER COLUMN id SET DEFAULT nextval('public."Cheque_id_seq"'::regclass);
 :   ALTER TABLE public."Cheque" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    129643    ChequeType id    DEFAULT     r   ALTER TABLE ONLY public."ChequeType" ALTER COLUMN id SET DEFAULT nextval('public."ChequeType_id_seq"'::regclass);
 >   ALTER TABLE public."ChequeType" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    129573 
   Country id    DEFAULT     l   ALTER TABLE ONLY public."Country" ALTER COLUMN id SET DEFAULT nextval('public."Country_id_seq"'::regclass);
 ;   ALTER TABLE public."Country" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            �           2604    129681    File id    DEFAULT     f   ALTER TABLE ONLY public."File" ALTER COLUMN id SET DEFAULT nextval('public."File_id_seq"'::regclass);
 8   ALTER TABLE public."File" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    225    226            �           2604    129671    FileType id    DEFAULT     n   ALTER TABLE ONLY public."FileType" ALTER COLUMN id SET DEFAULT nextval('public."FileType_id_seq"'::regclass);
 <   ALTER TABLE public."FileType" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            �           2604    129827 
   Journal id    DEFAULT     l   ALTER TABLE ONLY public."Journal" ALTER COLUMN id SET DEFAULT nextval('public."Journal_id_seq"'::regclass);
 ;   ALTER TABLE public."Journal" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    241    242    242            �           2604    129587    Subscription id    DEFAULT     v   ALTER TABLE ONLY public."Subscription" ALTER COLUMN id SET DEFAULT nextval('public."Subscription_id_seq"'::regclass);
 @   ALTER TABLE public."Subscription" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    129561    SubscriptionType id    DEFAULT     ~   ALTER TABLE ONLY public."SubscriptionType" ALTER COLUMN id SET DEFAULT nextval('public."SubscriptionType_id_seq"'::regclass);
 D   ALTER TABLE public."SubscriptionType" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    129698    Task id    DEFAULT     f   ALTER TABLE ONLY public."Task" ALTER COLUMN id SET DEFAULT nextval('public."Task_id_seq"'::regclass);
 8   ALTER TABLE public."Task" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227    228            �           2604    129718    TaskComment id    DEFAULT     t   ALTER TABLE ONLY public."TaskComment" ALTER COLUMN id SET DEFAULT nextval('public."TaskComment_id_seq"'::regclass);
 ?   ALTER TABLE public."TaskComment" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229    230            �           2604    129741    TaskJournal id    DEFAULT     t   ALTER TABLE ONLY public."TaskJournal" ALTER COLUMN id SET DEFAULT nextval('public."TaskJournal_id_seq"'::regclass);
 ?   ALTER TABLE public."TaskJournal" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    234    234            �           2604    129731    TaskStatus id    DEFAULT     r   ALTER TABLE ONLY public."TaskStatus" ALTER COLUMN id SET DEFAULT nextval('public."TaskStatus_id_seq"'::regclass);
 >   ALTER TABLE public."TaskStatus" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    231    232            �           2604    129759    Todo id    DEFAULT     f   ALTER TABLE ONLY public."Todo" ALTER COLUMN id SET DEFAULT nextval('public."Todo_id_seq"'::regclass);
 8   ALTER TABLE public."Todo" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    236    235    236            �           2604    129619    User id    DEFAULT     f   ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);
 8   ALTER TABLE public."User" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    129609    UserRole id    DEFAULT     n   ALTER TABLE ONLY public."UserRole" ALTER COLUMN id SET DEFAULT nextval('public."UserRole_id_seq"'::regclass);
 <   ALTER TABLE public."UserRole" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    129793    UsersSubscriptions id    DEFAULT     �   ALTER TABLE ONLY public."UsersSubscriptions" ALTER COLUMN id SET DEFAULT nextval('public."UsersSubscriptions_id_seq"'::regclass);
 F   ALTER TABLE public."UsersSubscriptions" ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    239    239            �          0    129650    Cheque 
   TABLE DATA           �   COPY public."Cheque" (id, payment, "accountNumber", "userId", "chequeTypeId", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    222   ��       �          0    129640 
   ChequeType 
   TABLE DATA           [   COPY public."ChequeType" (id, name, "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    220   ��       �          0    129570    Country 
   TABLE DATA           g   COPY public."Country" (id, name, "countryCode", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    212   ��       �          0    129678    File 
   TABLE DATA           h   COPY public."File" (id, name, uri, "fileTypeId", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    226   �       �          0    129668    FileType 
   TABLE DATA           Y   COPY public."FileType" (id, name, "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    224   j�       �          0    129824    Journal 
   TABLE DATA           [   COPY public."Journal" (id, content, "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    242   ��       �          0    129584    Subscription 
   TABLE DATA           �   COPY public."Subscription" (id, name, logo, "subscriptionTypeId", "countryId", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    214   M�       �          0    129558    SubscriptionType 
   TABLE DATA           q   COPY public."SubscriptionType" (id, name, cost, duration, "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   ��       �          0    129695    Task 
   TABLE DATA           �   COPY public."Task" (id, name, description, advance, cost, "startDatetime", "endDatetime", "authorId", "workerId", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    228   �       �          0    129715    TaskComment 
   TABLE DATA           i   COPY public."TaskComment" (id, content, "taskId", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    230   0�       �          0    129738    TaskJournal 
   TABLE DATA           u   COPY public."TaskJournal" (id, comment, "taskId", "statusId", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    234   M�       �          0    129728 
   TaskStatus 
   TABLE DATA           [   COPY public."TaskStatus" (id, name, "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    232   j�       �          0    129756    Todo 
   TABLE DATA           \   COPY public."Todo" (id, description, "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    236   ��       �          0    129616    User 
   TABLE DATA           �   COPY public."User" (id, username, password, phone, "countryId", "userRoleId", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    218   ��       �          0    129606    UserRole 
   TABLE DATA           Y   COPY public."UserRole" (id, name, "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    216   ��       �          0    129807    UserSubscriptions 
   TABLE DATA           c   COPY public."UserSubscriptions" ("createdAt", "updatedAt", "UserId", "SubscriptionId") FROM stdin;
    public          postgres    false    240   ��       �          0    129763 
   UsersFiles 
   TABLE DATA           y   COPY public."UsersFiles" ("userId", "fileId", "logicalDelete", "createdAt", "updatedAt", "UserId", "FileId") FROM stdin;
    public          postgres    false    237   �       �          0    129790    UsersSubscriptions 
   TABLE DATA           �   COPY public."UsersSubscriptions" (id, "beginDatetime", "endDatetime", "isActive", "userId", "subscriptionId", "logicalDelete", "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    239   7�       �           0    0    ChequeType_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."ChequeType_id_seq"', 1, false);
          public          postgres    false    219            �           0    0    Cheque_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Cheque_id_seq"', 1, false);
          public          postgres    false    221            �           0    0    Country_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public."Country_id_seq"', 1, true);
          public          postgres    false    211            �           0    0    FileType_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."FileType_id_seq"', 1, true);
          public          postgres    false    223            �           0    0    File_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."File_id_seq"', 16, true);
          public          postgres    false    225            �           0    0    Journal_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."Journal_id_seq"', 76, true);
          public          postgres    false    241            �           0    0    SubscriptionType_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."SubscriptionType_id_seq"', 1, true);
          public          postgres    false    209            �           0    0    Subscription_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Subscription_id_seq"', 1, true);
          public          postgres    false    213            �           0    0    TaskComment_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."TaskComment_id_seq"', 1, false);
          public          postgres    false    229            �           0    0    TaskJournal_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."TaskJournal_id_seq"', 1, false);
          public          postgres    false    233            �           0    0    TaskStatus_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."TaskStatus_id_seq"', 1, false);
          public          postgres    false    231            �           0    0    Task_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Task_id_seq"', 1, false);
          public          postgres    false    227            �           0    0    Todo_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public."Todo_id_seq"', 1, false);
          public          postgres    false    235            �           0    0    UserRole_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."UserRole_id_seq"', 1, true);
          public          postgres    false    215            �           0    0    User_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public."User_id_seq"', 3, true);
          public          postgres    false    217            �           0    0    UsersSubscriptions_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."UsersSubscriptions_id_seq"', 2, true);
          public          postgres    false    238            �           2606    129648    ChequeType ChequeType_name_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public."ChequeType"
    ADD CONSTRAINT "ChequeType_name_key" UNIQUE (name);
 L   ALTER TABLE ONLY public."ChequeType" DROP CONSTRAINT "ChequeType_name_key";
       public            postgres    false    220            �           2606    129646    ChequeType ChequeType_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."ChequeType"
    ADD CONSTRAINT "ChequeType_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."ChequeType" DROP CONSTRAINT "ChequeType_pkey";
       public            postgres    false    220            �           2606    129656    Cheque Cheque_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Cheque"
    ADD CONSTRAINT "Cheque_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Cheque" DROP CONSTRAINT "Cheque_pkey";
       public            postgres    false    222            �           2606    129582    Country Country_countryCode_key 
   CONSTRAINT     g   ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_countryCode_key" UNIQUE ("countryCode");
 M   ALTER TABLE ONLY public."Country" DROP CONSTRAINT "Country_countryCode_key";
       public            postgres    false    212            �           2606    129580    Country Country_name_key 
   CONSTRAINT     W   ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_name_key" UNIQUE (name);
 F   ALTER TABLE ONLY public."Country" DROP CONSTRAINT "Country_name_key";
       public            postgres    false    212            �           2606    129578    Country Country_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Country" DROP CONSTRAINT "Country_pkey";
       public            postgres    false    212            �           2606    129676    FileType FileType_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public."FileType"
    ADD CONSTRAINT "FileType_name_key" UNIQUE (name);
 H   ALTER TABLE ONLY public."FileType" DROP CONSTRAINT "FileType_name_key";
       public            postgres    false    224            �           2606    129674    FileType FileType_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."FileType"
    ADD CONSTRAINT "FileType_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."FileType" DROP CONSTRAINT "FileType_pkey";
       public            postgres    false    224            �           2606    129686    File File_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."File" DROP CONSTRAINT "File_pkey";
       public            postgres    false    226            �           2606    129688    File File_uri_key 
   CONSTRAINT     O   ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_uri_key" UNIQUE (uri);
 ?   ALTER TABLE ONLY public."File" DROP CONSTRAINT "File_uri_key";
       public            postgres    false    226            	           2606    129830    Journal Journal_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public."Journal"
    ADD CONSTRAINT "Journal_pkey" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public."Journal" DROP CONSTRAINT "Journal_pkey";
       public            postgres    false    242            �           2606    129568 *   SubscriptionType SubscriptionType_name_key 
   CONSTRAINT     i   ALTER TABLE ONLY public."SubscriptionType"
    ADD CONSTRAINT "SubscriptionType_name_key" UNIQUE (name);
 X   ALTER TABLE ONLY public."SubscriptionType" DROP CONSTRAINT "SubscriptionType_name_key";
       public            postgres    false    210            �           2606    129566 &   SubscriptionType SubscriptionType_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public."SubscriptionType"
    ADD CONSTRAINT "SubscriptionType_pkey" PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."SubscriptionType" DROP CONSTRAINT "SubscriptionType_pkey";
       public            postgres    false    210            �           2606    129594 "   Subscription Subscription_name_key 
   CONSTRAINT     a   ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_name_key" UNIQUE (name);
 P   ALTER TABLE ONLY public."Subscription" DROP CONSTRAINT "Subscription_name_key";
       public            postgres    false    214            �           2606    129592    Subscription Subscription_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY (id);
 L   ALTER TABLE ONLY public."Subscription" DROP CONSTRAINT "Subscription_pkey";
       public            postgres    false    214            �           2606    129721    TaskComment TaskComment_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."TaskComment"
    ADD CONSTRAINT "TaskComment_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."TaskComment" DROP CONSTRAINT "TaskComment_pkey";
       public            postgres    false    230            �           2606    129744    TaskJournal TaskJournal_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public."TaskJournal"
    ADD CONSTRAINT "TaskJournal_pkey" PRIMARY KEY (id);
 J   ALTER TABLE ONLY public."TaskJournal" DROP CONSTRAINT "TaskJournal_pkey";
       public            postgres    false    234            �           2606    129736    TaskStatus TaskStatus_name_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public."TaskStatus"
    ADD CONSTRAINT "TaskStatus_name_key" UNIQUE (name);
 L   ALTER TABLE ONLY public."TaskStatus" DROP CONSTRAINT "TaskStatus_name_key";
       public            postgres    false    232            �           2606    129734    TaskStatus TaskStatus_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."TaskStatus"
    ADD CONSTRAINT "TaskStatus_pkey" PRIMARY KEY (id);
 H   ALTER TABLE ONLY public."TaskStatus" DROP CONSTRAINT "TaskStatus_pkey";
       public            postgres    false    232            �           2606    129703    Task Task_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_pkey";
       public            postgres    false    228                       2606    129762    Todo Todo_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."Todo"
    ADD CONSTRAINT "Todo_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."Todo" DROP CONSTRAINT "Todo_pkey";
       public            postgres    false    236            �           2606    129614    UserRole UserRole_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_name_key" UNIQUE (name);
 H   ALTER TABLE ONLY public."UserRole" DROP CONSTRAINT "UserRole_name_key";
       public            postgres    false    216            �           2606    129612    UserRole UserRole_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."UserRole"
    ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public."UserRole" DROP CONSTRAINT "UserRole_pkey";
       public            postgres    false    216                       2606    129811 (   UserSubscriptions UserSubscriptions_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."UserSubscriptions"
    ADD CONSTRAINT "UserSubscriptions_pkey" PRIMARY KEY ("UserId", "SubscriptionId");
 V   ALTER TABLE ONLY public."UserSubscriptions" DROP CONSTRAINT "UserSubscriptions_pkey";
       public            postgres    false    240    240            �           2606    129628    User User_phone_key 
   CONSTRAINT     S   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_phone_key" UNIQUE (phone);
 A   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_phone_key";
       public            postgres    false    218            �           2606    129624    User User_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_pkey";
       public            postgres    false    218            �           2606    129626    User User_username_key 
   CONSTRAINT     Y   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_username_key" UNIQUE (username);
 D   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_username_key";
       public            postgres    false    218                       2606    129768    UsersFiles UsersFiles_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."UsersFiles"
    ADD CONSTRAINT "UsersFiles_pkey" PRIMARY KEY ("UserId", "FileId");
 H   ALTER TABLE ONLY public."UsersFiles" DROP CONSTRAINT "UsersFiles_pkey";
       public            postgres    false    237    237                       2606    129796 *   UsersSubscriptions UsersSubscriptions_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public."UsersSubscriptions"
    ADD CONSTRAINT "UsersSubscriptions_pkey" PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."UsersSubscriptions" DROP CONSTRAINT "UsersSubscriptions_pkey";
       public            postgres    false    239                       2606    129662    Cheque Cheque_chequeTypeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cheque"
    ADD CONSTRAINT "Cheque_chequeTypeId_fkey" FOREIGN KEY ("chequeTypeId") REFERENCES public."ChequeType"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 M   ALTER TABLE ONLY public."Cheque" DROP CONSTRAINT "Cheque_chequeTypeId_fkey";
       public          postgres    false    220    3307    222                       2606    129657    Cheque Cheque_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Cheque"
    ADD CONSTRAINT "Cheque_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public."Cheque" DROP CONSTRAINT "Cheque_userId_fkey";
       public          postgres    false    218    3301    222                       2606    129689    File File_fileTypeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."File"
    ADD CONSTRAINT "File_fileTypeId_fkey" FOREIGN KEY ("fileTypeId") REFERENCES public."FileType"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public."File" DROP CONSTRAINT "File_fileTypeId_fkey";
       public          postgres    false    224    3313    226                       2606    129600 (   Subscription Subscription_countryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public."Subscription" DROP CONSTRAINT "Subscription_countryId_fkey";
       public          postgres    false    3289    212    214            
           2606    129595 1   Subscription Subscription_subscriptionTypeId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_subscriptionTypeId_fkey" FOREIGN KEY ("subscriptionTypeId") REFERENCES public."SubscriptionType"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 _   ALTER TABLE ONLY public."Subscription" DROP CONSTRAINT "Subscription_subscriptionTypeId_fkey";
       public          postgres    false    210    3283    214                       2606    129722 #   TaskComment TaskComment_taskId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaskComment"
    ADD CONSTRAINT "TaskComment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."TaskComment" DROP CONSTRAINT "TaskComment_taskId_fkey";
       public          postgres    false    3319    230    228                       2606    129750 %   TaskJournal TaskJournal_statusId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaskJournal"
    ADD CONSTRAINT "TaskJournal_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES public."TaskStatus"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 S   ALTER TABLE ONLY public."TaskJournal" DROP CONSTRAINT "TaskJournal_statusId_fkey";
       public          postgres    false    234    3325    232                       2606    129745 #   TaskJournal TaskJournal_taskId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."TaskJournal"
    ADD CONSTRAINT "TaskJournal_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public."TaskJournal" DROP CONSTRAINT "TaskJournal_taskId_fkey";
       public          postgres    false    228    3319    234                       2606    129704    Task Task_authorId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_authorId_fkey";
       public          postgres    false    228    3301    218                       2606    129709    Task Task_workerId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 E   ALTER TABLE ONLY public."Task" DROP CONSTRAINT "Task_workerId_fkey";
       public          postgres    false    218    228    3301                       2606    129817 7   UserSubscriptions UserSubscriptions_SubscriptionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserSubscriptions"
    ADD CONSTRAINT "UserSubscriptions_SubscriptionId_fkey" FOREIGN KEY ("SubscriptionId") REFERENCES public."Subscription"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 e   ALTER TABLE ONLY public."UserSubscriptions" DROP CONSTRAINT "UserSubscriptions_SubscriptionId_fkey";
       public          postgres    false    240    214    3293                       2606    129812 /   UserSubscriptions UserSubscriptions_UserId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UserSubscriptions"
    ADD CONSTRAINT "UserSubscriptions_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 ]   ALTER TABLE ONLY public."UserSubscriptions" DROP CONSTRAINT "UserSubscriptions_UserId_fkey";
       public          postgres    false    218    240    3301                       2606    129629    User User_countryId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 F   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_countryId_fkey";
       public          postgres    false    218    212    3289                       2606    129634    User User_userRoleId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_userRoleId_fkey" FOREIGN KEY ("userRoleId") REFERENCES public."UserRole"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 G   ALTER TABLE ONLY public."User" DROP CONSTRAINT "User_userRoleId_fkey";
       public          postgres    false    216    3297    218                       2606    129784 !   UsersFiles UsersFiles_FileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UsersFiles"
    ADD CONSTRAINT "UsersFiles_FileId_fkey" FOREIGN KEY ("FileId") REFERENCES public."File"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."UsersFiles" DROP CONSTRAINT "UsersFiles_FileId_fkey";
       public          postgres    false    226    237    3315                       2606    129779 !   UsersFiles UsersFiles_UserId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UsersFiles"
    ADD CONSTRAINT "UsersFiles_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;
 O   ALTER TABLE ONLY public."UsersFiles" DROP CONSTRAINT "UsersFiles_UserId_fkey";
       public          postgres    false    218    237    3301                       2606    129774 !   UsersFiles UsersFiles_fileId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UsersFiles"
    ADD CONSTRAINT "UsersFiles_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES public."File"(id);
 O   ALTER TABLE ONLY public."UsersFiles" DROP CONSTRAINT "UsersFiles_fileId_fkey";
       public          postgres    false    237    226    3315                       2606    129769 !   UsersFiles UsersFiles_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UsersFiles"
    ADD CONSTRAINT "UsersFiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id);
 O   ALTER TABLE ONLY public."UsersFiles" DROP CONSTRAINT "UsersFiles_userId_fkey";
       public          postgres    false    218    237    3301                       2606    129802 9   UsersSubscriptions UsersSubscriptions_subscriptionId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UsersSubscriptions"
    ADD CONSTRAINT "UsersSubscriptions_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES public."Subscription"(id);
 g   ALTER TABLE ONLY public."UsersSubscriptions" DROP CONSTRAINT "UsersSubscriptions_subscriptionId_fkey";
       public          postgres    false    239    3293    214                       2606    129797 1   UsersSubscriptions UsersSubscriptions_userId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public."UsersSubscriptions"
    ADD CONSTRAINT "UsersSubscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id);
 _   ALTER TABLE ONLY public."UsersSubscriptions" DROP CONSTRAINT "UsersSubscriptions_userId_fkey";
       public          postgres    false    3301    239    218            �      x������ � �      �      x������ � �      �   8   x�3�*-.�L�
�L�4202�50�50T04�2��24�3�4�60�#����� Po�      �   =  x���Aj1@���˄�'?�dk�]u��MaPt��R�k7�F���Z
�!ި2J�ݹ�yy	�·n?��i d�D�p��rf(Hq��Dd/����h��Zg<	"*�����E
�q�	"�7���x���Re<	"�7H�R7�*�+�����D��j�/�sBmAS#r�.��:w|����r����߶��;?�g����{��?����-n�s��i}㪩�[6�E����Kf� T�̌ô�T]�
���v�(�l���[��c)����p�j�B0Z�/����A���)"\]�T1Q�˥�2F��|�G	!�'      �   6   x�3�tr��s�L�4202�50�50U04�24�21�374�60�#����� ��x      �   �  x���Mo�6�Ϟ_���4���nAяC��{��q6�6��zw��w��]R3
����W���C������v���=�~�~�����������isu�:���w�����aw���W��������Ňo=]Z��n�܄Ä��^Y�
/������xw�y/'7�ђl(�|���^�7[��	��	vX���7�M����|?kbB%�@{�i��j��������>�����_DM��F3�(kJ�kh�hhTަD0��&��^hQ#p�%=<.�%0�/k*ν��&7?r�nYS#p�����0���5�v��=~��:1	j��y����'R�D����8���RP p}�sJ���c�����B�k7Ee�J�-�JAʋ��7(��xi�\��Ҳ�F�۪k/2���-֒�o[�R��Ãؠ*�����Y+���߷����T"㒘I5�g3�`>���|���9�ō�e�J�m�����!-�k,:�GH �m�?p�^�A��RP �m�����������o���&;�8F%�@�m�W
�*��RP ���Z�ħ�Ѥ��5lo�+�J���5^)�3�5(��F�m�W
�d��b���J����h�,���x�����/zECI�xF�穬�8��"	jا�<N�Z�� ���Y*��0��C��v��-	P��O!!7����C�S
��y�	ZA��:t~NɫN��P�Χ��m�u�|J��-����+���Q�"@���WL��(P�ŧ��r�8�$-V�;5���1��������1�����A�8���gT�p� �Z��b9F�%��k1�y��*����%��٤��AZ����nn?ʂq��L�λ�DAhn�k)�|R

Az|f��/�ZA� H��,�-�7e� 4=V(�@]���5��y���{�E��@��g�5l06D��@����*�ؤ�4���ӱ��RP"���3��L��7(�>�i�k�e~�T���9%�UO�E%��g����G�b�ɜ��T�b��y���/J��d���Q)(�^�1�qI�E%��k2���ZYMk��d��g2^�E%��k2�|xIy�A�5��C���#�z=�^ϖ���� �2|�      �   M   x�3�0���[/l���b���p��*���sa��������������������������1)�=... ��c      �   Y   x�3�0��/��xaׅ
���yv_�za�����
��y%�i�FF&�ƺ�
�V&�V�fz���x��b���� �'#�      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �     x�}�Mk�@�ϛ_у71���gn!F�*U�*J/��F4)�i-��A�V:3�����l҄�`�u�=1~܊!�����qH�MP�ĩ����T��t8t�f6x��)���i��g-M�`g{�,kk���|>Ģ-׹94�^ڈ6��HP���5��d��6;;z�҂O����롿j�b�Ͻ�ix܇�>�~��"�S��e�U.hrU	
MI�$l � @�J���iS*��{+Q)d�3���Ս
29��B���5���(�~ �&d�      �   3   x�3�v�L�4202�50�50T04�2��2��3���60�#����� �*�      �      x������ � �      �      x������ � �      �   K   x�U���0kk�����h�����M���p,[�W�f��������K�f܊8��T�~��8�<*"/�p�     