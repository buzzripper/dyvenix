//using Dyvenix.App1.Common.Entities;
//using Dyvenix.App1.Server.Services.Queries;
//using Dyvenix.Core.ApiClients;
//using Dyvenix.Core.DTOs;
//using Dyvenix.Core.Entities;
//using Dyvenix.Logging;
//using Microsoft.AspNetCore.Http;
//using System;
//using System.Collections.Generic;
//using System.Net.Http;
//using System.Threading.Tasks;

//namespace Dyvenix.App1.Common.ApiClients;

//public interface IAppUserClient
//{
//    Task<ServiceResponse> CreateAppUser(AppUser appUser);
//    Task<ServiceResponse> UpdateAppUser(AppUser appUser);
//    Task<ServiceResponse> DeleteAppUser(Guid id);
//    Task<ServiceResponse<AppUser>> GetById(Guid id);
//    Task<ServiceResponse<AppUser>> GetByEmail(string email);
//    Task<ServiceResponse<List<AppUser>>> GetAll();
//    Task<ServiceResponse<List<AppUser>>> GetWithLastName(string lastName, int pageSize = 0, int rowOffset = 0);
//    Task<ServiceResponse<List<AppUser>>> GetWithExtId(string extId);
//    Task<ServiceResponse<List<AppUser>>> GetAll2(int pageSize = 0, int rowOffset = 0);
//    Task<ServiceResponse<EntityList<AppUser>>> FindCompanyUsers(FindCompanyUsersQuery query);
//    Task<ServiceResponse<EntityList<AppUser>>> QueryDisabledUsers(QueryDisabledUsersQuery query);
//}

//public class AppUserClient : ApiClientBase<AppUserClient>, IAppUserClient
//{
//    public AppUserClient(IHttpClientFactory httpClientFactory, string baseUrl, IHttpContextAccessor httpContextAccessor, IDyvenixLogger<AppUserClient> logger)
//        : base(httpClientFactory, baseUrl, httpContextAccessor, logger)
//    {
//    }

//    public async Task<ServiceResponse> CreateAppUser(AppUser appUser)
//    {
//        ArgumentNullException.ThrowIfNull(appUser);

//        return await PostAsync<ServiceResponse>("v1/AppUser/CreateAppUser", appUser);
//    }

//    public async Task<ServiceResponse> UpdateAppUser(AppUser appUser)
//    {
//        return await PostAsync<ServiceResponse>("v1/AppUser/UpdateAppUser", appUser);
//    }

//    public async Task<ServiceResponse> DeleteAppUser(Guid id)
//    {
//        return await PostAsync<ServiceResponse>($"v1/AppUser/DeleteAppUser/{id}", null);
//    }



//    public async Task<ServiceResponse<AppUser>> GetById(Guid id)
//    {
//        return await GetAsync<ServiceResponse<AppUser>>($"v1/AppUser/GetById/{id}");
//    }

//    public async Task<ServiceResponse<AppUser>> GetByEmail(string email)
//    {
//        return await GetAsync<ServiceResponse<AppUser>>($"v1/AppUser/GetByEmail/{email}");
//    }




//    public async Task<ServiceResponse<List<AppUser>>> GetAll()
//    {
//        return await GetAsync<ServiceResponse<List<AppUser>>>("v1/AppUser/GetAll");
//    }

//    public async Task<ServiceResponse<List<AppUser>>> GetWithLastName(string lastName, int pageSize = 0, int rowOffset = 0)
//    {
//        return await GetAsync<ServiceResponse<List<AppUser>>>($"v1/AppUser/GetWithLastName/{lastName}/{pageSize}/{rowOffset}");
//    }

//    public async Task<ServiceResponse<List<AppUser>>> GetWithExtId(string extId)
//    {
//        return await GetAsync<ServiceResponse<List<AppUser>>>($"v1/AppUser/GetWithExtId/{extId}");
//    }

//    public async Task<ServiceResponse<List<AppUser>>> GetAll2(int pageSize = 0, int rowOffset = 0)
//    {
//        return await GetAsync<ServiceResponse<List<AppUser>>>($"v1/AppUser/GetAll2/{pageSize}/{rowOffset}");
//    }

//    public async Task<ServiceResponse<EntityList<AppUser>>> FindCompanyUsers(FindCompanyUsersQuery query)
//    {
//        return await PostAsync<ServiceResponse<EntityList<AppUser>>>("v1/AppUser/FindCompanyUsers", query);
//    }

//    public async Task<ServiceResponse<EntityList<AppUser>>> QueryDisabledUsers(QueryDisabledUsersQuery query)
//    {
//        return await PostAsync<ServiceResponse<EntityList<AppUser>>>("v1/AppUser/QueryDisabledUsers", query);
//    }
//}
