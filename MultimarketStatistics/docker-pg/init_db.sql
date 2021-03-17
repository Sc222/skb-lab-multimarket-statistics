--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.1 (Debian 13.1-1.pgdg100+1)

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
-- Name: Apps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Apps" (
    "Id" uuid NOT NULL,
    "Name" text,
    "AppGalleryId" text,
    "AppStoreId" text,
    "PlayMarketId" text,
    "UserForeignKey" uuid NOT NULL,
    "Description" text,
    "PicUrl" text
);


ALTER TABLE public."Apps" OWNER TO postgres;

--
-- Name: Locales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Locales" (
    "AppId" uuid NOT NULL,
    "Market" integer NOT NULL
);


ALTER TABLE public."Locales" OWNER TO postgres;

--
-- Name: Notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Notifications" (
    "Id" uuid NOT NULL,
    "AppForeignKey" uuid NOT NULL,
    "UserForeignKey" uuid NOT NULL,
    "Text" text,
    "IsChecked" boolean NOT NULL,
    "Title" text,
    "Date" timestamp without time zone NOT NULL
);


ALTER TABLE public."Notifications" OWNER TO postgres;

--
-- Name: Ratings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Ratings" (
    "Id" uuid NOT NULL,
    "AppForeignKey" uuid NOT NULL,
    "AverageRating" double precision NOT NULL,
    "Date" timestamp without time zone NOT NULL,
    "Market" integer NOT NULL
);


ALTER TABLE public."Ratings" OWNER TO postgres;

--
-- Name: Reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reviews" (
    "Id" uuid NOT NULL,
    "AppForeignKey" uuid NOT NULL,
    "Market" integer NOT NULL,
    "MarketReviewId" text,
    "Text" text,
    "Rating" integer NOT NULL,
    "ReviewerUsername" text,
    "Version" text,
    "Date" timestamp without time zone NOT NULL,
    "DevResponse" text,
    "IsChecked" boolean NOT NULL
);


ALTER TABLE public."Reviews" OWNER TO postgres;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    "Id" uuid NOT NULL,
    "Username" text,
    "Password" text,
    "Email" text,
    "SlackCredentials" text
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Versions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Versions" (
    "Id" uuid NOT NULL,
    "Number" text,
    "AppId" uuid NOT NULL,
    "Market" integer NOT NULL
);


ALTER TABLE public."Versions" OWNER TO postgres;

--
-- Name: __EFMigrationsHistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);


ALTER TABLE public."__EFMigrationsHistory" OWNER TO postgres;

--
-- Data for Name: Apps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Apps" ("Id", "Name", "AppGalleryId", "AppStoreId", "PlayMarketId", "UserForeignKey", "Description", "PicUrl") FROM stdin;
\.


--
-- Data for Name: Locales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Locales" ("AppId", "Market") FROM stdin;
\.


--
-- Data for Name: Notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Notifications" ("Id", "AppForeignKey", "UserForeignKey", "Text", "IsChecked", "Title", "Date") FROM stdin;
\.


--
-- Data for Name: Ratings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ratings" ("Id", "AppForeignKey", "AverageRating", "Date", "Market") FROM stdin;
\.


--
-- Data for Name: Reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reviews" ("Id", "AppForeignKey", "Market", "MarketReviewId", "Text", "Rating", "ReviewerUsername", "Version", "Date", "DevResponse", "IsChecked") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" ("Id", "Username", "Password", "Email", "SlackCredentials") FROM stdin;
\.


--
-- Data for Name: Versions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Versions" ("Id", "Number", "AppId", "Market") FROM stdin;
\.


--
-- Data for Name: __EFMigrationsHistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
20210222191855_Clean	3.1.9
\.


--
-- Name: Apps PK_Apps; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Apps"
    ADD CONSTRAINT "PK_Apps" PRIMARY KEY ("Id");


--
-- Name: Locales PK_Locales; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Locales"
    ADD CONSTRAINT "PK_Locales" PRIMARY KEY ("AppId", "Market");


--
-- Name: Notifications PK_Notifications; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "PK_Notifications" PRIMARY KEY ("Id");


--
-- Name: Ratings PK_Ratings; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ratings"
    ADD CONSTRAINT "PK_Ratings" PRIMARY KEY ("Id");


--
-- Name: Reviews PK_Reviews; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "PK_Reviews" PRIMARY KEY ("Id");


--
-- Name: Users PK_Users; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "PK_Users" PRIMARY KEY ("Id");


--
-- Name: Versions PK_Versions; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Versions"
    ADD CONSTRAINT "PK_Versions" PRIMARY KEY ("Id");


--
-- Name: __EFMigrationsHistory PK___EFMigrationsHistory; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");


--
-- Name: IX_Apps_UserForeignKey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Apps_UserForeignKey" ON public."Apps" USING btree ("UserForeignKey");


--
-- Name: IX_Notifications_AppForeignKey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Notifications_AppForeignKey" ON public."Notifications" USING btree ("AppForeignKey");


--
-- Name: IX_Notifications_UserForeignKey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Notifications_UserForeignKey" ON public."Notifications" USING btree ("UserForeignKey");


--
-- Name: IX_Ratings_AppForeignKey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Ratings_AppForeignKey" ON public."Ratings" USING btree ("AppForeignKey");


--
-- Name: IX_Reviews_AppForeignKey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Reviews_AppForeignKey" ON public."Reviews" USING btree ("AppForeignKey");


--
-- Name: IX_Users_Email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IX_Users_Email" ON public."Users" USING btree ("Email");


--
-- Name: IX_Users_SlackCredentials; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IX_Users_SlackCredentials" ON public."Users" USING btree ("SlackCredentials");


--
-- Name: IX_Users_Username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "IX_Users_Username" ON public."Users" USING btree ("Username");


--
-- Name: Apps FK_Apps_Users_UserForeignKey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Apps"
    ADD CONSTRAINT "FK_Apps_Users_UserForeignKey" FOREIGN KEY ("UserForeignKey") REFERENCES public."Users"("Id");


--
-- Name: Notifications FK_Notifications_Apps_AppForeignKey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "FK_Notifications_Apps_AppForeignKey" FOREIGN KEY ("AppForeignKey") REFERENCES public."Apps"("Id");


--
-- Name: Notifications FK_Notifications_Users_UserForeignKey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Notifications"
    ADD CONSTRAINT "FK_Notifications_Users_UserForeignKey" FOREIGN KEY ("UserForeignKey") REFERENCES public."Users"("Id");


--
-- Name: Ratings FK_Ratings_Apps_AppForeignKey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Ratings"
    ADD CONSTRAINT "FK_Ratings_Apps_AppForeignKey" FOREIGN KEY ("AppForeignKey") REFERENCES public."Apps"("Id");


--
-- Name: Reviews FK_Reviews_Apps_AppForeignKey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reviews"
    ADD CONSTRAINT "FK_Reviews_Apps_AppForeignKey" FOREIGN KEY ("AppForeignKey") REFERENCES public."Apps"("Id");


--
-- PostgreSQL database dump complete
--

