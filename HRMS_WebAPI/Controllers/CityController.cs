using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HRMS_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityController : ControllerBase
    {
        [HttpGet]

        public IEnumerable<string> City() 
        {
            return new string[] { "New York", "New Jersey", "Chicago" };
        }
    }
}
