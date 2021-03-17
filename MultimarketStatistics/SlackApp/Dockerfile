FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
WORKDIR /app



#COPY Domain/*.csproj ./Domain/
#COPY Storage/*.csproj ./Storage/
#COPY *.csproj ./

#RUN dotnet restore "MultimarketStatistics.csproj"

COPY . ./

RUN dotnet publish SlackApp -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "SlackApp.dll"]







#FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
#COPY bin/Release/netcoreapp3.1/publish/ App/
#WORKDIR /App
#ENTRYPOINT ["dotnet", "MultimarketStatistics.dll"]
