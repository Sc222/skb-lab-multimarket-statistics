using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Http;

namespace MultimarketStatistics.Controllers
{
    public static class UserIdValidator
    {
        public static bool IsValidAction(HttpContext context, Guid userId) => (Guid)context.Items["UserId"] == userId;
    }
}
