--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.links VALUES (2, 1, 'https://codeforwin.org/', 'av3FueJ9', 2, '2023-02-27 14:02:30.936669');
INSERT INTO public.links VALUES (3, 2, 'http://gramota.ru/', 'gimqFLDp', 1, '2023-02-27 15:02:30.557597');
INSERT INTO public.links VALUES (4, 2, 'https://yandex.ru/q/', 'uITDuCvx', 2, '2023-02-27 15:27:46.606166');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 1, 'b074c539-c10b-4bb8-a248-09959b22048e', '2023-02-27 12:18:51.493892');
INSERT INTO public.sessions VALUES (2, 2, '90a06fe5-9455-463c-9a5c-af59e4cf502b', '2023-02-27 15:01:36.76457');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Peter', 'peter@email.com', '$2b$10$JETpq2jelo9NnyWpIhrAH.WZGBluPcEF7.niQStLzrQBL3x0BlvZW', '2023-02-27 12:07:44.54251');
INSERT INTO public.users VALUES (2, 'Mary', 'mary@email.com', '$2b$10$DPD4/NJPga0N51Rbdheo8OfvxRnYdRjdslWBx3JHFJWbQIieHMW8q', '2023-02-27 15:01:18.520612');
INSERT INTO public.users VALUES (3, 'John', 'john@email.com', '$2b$10$8YF9Cs5NmCQ9yuVVFbVdverMLCt7GZWiAznaOQbRyC9sDq97CHLIu', '2023-03-02 14:33:15.28426');
INSERT INTO public.users VALUES (4, 'Ann', 'ann@email.com', '$2b$10$8hHK/Ml4J/dRp5LqCGBShu.tNrhj0SD2ffTn.hnxmFCGRDv0oKmM6', '2023-03-02 14:34:24.371926');
INSERT INTO public.users VALUES (5, 'Jacob', 'jacob@email.com', '$2b$10$JSTag3rFdWp0raTO5ADUC.hG/VdUHfFp9nPTP3IXuLkUxkYYXck9G', '2023-03-02 14:34:45.290731');
INSERT INTO public.users VALUES (6, 'User6', 'user6@email.com', '$2b$10$Mys66PcF86a99auCdZoLO.QyWILQKa9tT0fPJZMlGKM70/UiQZxXS', '2023-03-02 14:35:08.346231');
INSERT INTO public.users VALUES (7, 'User7', 'user7@email.com', '$2b$10$o5kcX4bK72hRhWRuS7dKf.dWSogZX1thIwYm/E6xiaAX0Sr2bBEyW', '2023-03-02 14:35:16.352464');
INSERT INTO public.users VALUES (8, 'User8', 'user8@email.com', '$2b$10$/SLSIo3pYoJckzv1SYrS1Ot9IjXp1WFPkoCv12faED9hUkwtOEM4C', '2023-03-02 14:35:24.896809');
INSERT INTO public.users VALUES (9, 'User9', 'user9@email.com', '$2b$10$QTWzv7Df5sZ0fM/xX2MF5.wMK0bPbV6K1In.UkvXl3.sI3Jm3STWq', '2023-03-02 14:35:31.270144');
INSERT INTO public.users VALUES (10, 'User10', 'user10@email.com', '$2b$10$e/Q9PzW580/OnUVKidy22uRAJ1xCM5iMo05IKfovUvJvh0VoN9Huq', '2023-03-02 14:35:40.62327');
INSERT INTO public.users VALUES (11, 'User11', 'user11@email.com', '$2b$10$7e390ERX2fKswIHecb6.1eQnoxw785oN65KeU0irsSASpMWVhRUte', '2023-03-02 14:35:47.515439');


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.links_id_seq', 4, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: links links_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT "links_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

