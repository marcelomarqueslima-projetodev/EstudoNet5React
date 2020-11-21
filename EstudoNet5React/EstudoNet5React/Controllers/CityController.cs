using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EstudoNet5React.Controllers
{
    public class CityController : Controller
    {
        private readonly ApplicationDbContext _context;

        //public CityController(ApplicationDbContext context)
        //{
        //    _context = context;

        //    if (_context.City.Count() == 0)
        //    {
        //        _context.City.Add(new City() { Name = "Cambé", DispayOrder = 1});
        //        _context.City.Add(new City() { Name = "Londrina", DispayOrder = 2 });
        //        _context.City.Add(new City() { Name = "Curitiba", DispayOrder = 3 });
        //        _context.City.Add(new City() { Name = "Maringá", DispayOrder = 4 });
        //        _context.SaveChanges();
        //    }
        //}

        [HttpGet]
        public List<City> GetCity()
        {
            return _context.City.ToList();
        }

        [HttpGet("[action]/{id}")]
        public City GetCity(int id)
        {
            var City = _context.City.Find(id);

            if (City == null)
            {
                return null;
            }
            else
            {
                return City;
            }
        }

        [HttpPost]
        public IActionResult AddCity([FromBody] City item)
        {
            _context.City.Add(item);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpPut]
        public IActionResult Update([FromBody] City city)
        {
            var CityToUpdate = _context.City.Find(City.Id);

            if (CityToUpdate == null)
            {
                return NotFound();
            }

            CityToUpdate.Powers = City.Name;

            _context.City.Update(CityToUpdate);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var CityToDelete = _context.City.Find(id);

            if (CityToDelete == null)
            {
                return NotFound();
            }

            _context.City.Remove(CityToDelete);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }
    }
}
