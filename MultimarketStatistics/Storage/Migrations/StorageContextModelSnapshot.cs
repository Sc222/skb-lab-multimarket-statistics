﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Storage;

namespace Storage.Migrations
{
    [DbContext(typeof(StorageContext))]
    partial class StorageContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Storage.Entities.App", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("AppGalleryId")
                        .HasColumnType("text");

                    b.Property<string>("AppStoreId")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("PicUrl")
                        .HasColumnType("text");

                    b.Property<string>("PlayMarketId")
                        .HasColumnType("text");

                    b.Property<Guid?>("UserForeignKey")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UserForeignKey");

                    b.ToTable("Apps");
                });

            modelBuilder.Entity("Storage.Entities.Locale", b =>
                {
                    b.Property<Guid>("AppId")
                        .HasColumnType("uuid");

                    b.Property<int>("Market")
                        .HasColumnType("integer");

                    b.HasKey("AppId", "Market");

                    b.ToTable("Locales");
                });

            modelBuilder.Entity("Storage.Entities.Notification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AppForeignKey")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<bool>("IsChecked")
                        .HasColumnType("boolean");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.Property<Guid?>("UserForeignKey")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("AppForeignKey");

                    b.HasIndex("UserForeignKey");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("Storage.Entities.Rating", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AppForeignKey")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<double>("AverageRating")
                        .HasColumnType("double precision");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("Market")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AppForeignKey");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("Storage.Entities.Review", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("AppForeignKey")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("DevResponse")
                        .HasColumnType("text");

                    b.Property<bool>("IsChecked")
                        .HasColumnType("boolean");

                    b.Property<int>("Market")
                        .HasColumnType("integer");

                    b.Property<string>("MarketReviewId")
                        .HasColumnType("text");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<string>("ReviewerUsername")
                        .HasColumnType("text");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.Property<string>("Version")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("AppForeignKey");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("Storage.Entities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<string>("SlackCredentials")
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("SlackCredentials");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Storage.Entities.Version", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("AppId")
                        .HasColumnType("uuid");

                    b.Property<int>("Market")
                        .HasColumnType("integer");

                    b.Property<string>("Number")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Versions");
                });

            modelBuilder.Entity("Storage.Entities.App", b =>
                {
                    b.HasOne("Storage.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserForeignKey")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("Storage.Entities.Notification", b =>
                {
                    b.HasOne("Storage.Entities.App", "App")
                        .WithMany()
                        .HasForeignKey("AppForeignKey")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Storage.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserForeignKey")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("Storage.Entities.Rating", b =>
                {
                    b.HasOne("Storage.Entities.App", "App")
                        .WithMany()
                        .HasForeignKey("AppForeignKey")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });

            modelBuilder.Entity("Storage.Entities.Review", b =>
                {
                    b.HasOne("Storage.Entities.App", "App")
                        .WithMany()
                        .HasForeignKey("AppForeignKey")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
