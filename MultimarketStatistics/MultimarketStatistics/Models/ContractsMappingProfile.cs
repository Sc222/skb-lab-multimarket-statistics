using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Storage.Entities;

namespace MultimarketStatistics.Models
{
    public class ContractsMappingProfile : Profile
    {
        public ContractsMappingProfile()
        {
            CreateMap<App, AppContract>().ReverseMap();
            CreateMap<Notification, NotificationContract>().ForMember(d => d.AppId, opt => opt.MapFrom(s => s.App.Id)).ReverseMap();
            CreateMap<Rating, RatingContract>().ReverseMap();
            CreateMap<Review, ReviewContract>().ReverseMap();
            CreateMap<User, UserContract>().ReverseMap();
        }
    }
}
