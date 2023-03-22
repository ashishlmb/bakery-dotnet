migration run
do this only once
  dotnet new tool-manifest
  dotnet tool install  dotnet-ef
  
  
  dotnet ef migrations add Initial -o Data/Migrations


  to update database

  dotnet ef database update

 if error then run the command below before update
  dotnet tool restore