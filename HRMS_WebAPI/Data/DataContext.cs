using Microsoft.EntityFrameworkCore;

namespace HRMS_WebAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> dbContextOptions) : base(dbContextOptions)
        { }
    }
}
