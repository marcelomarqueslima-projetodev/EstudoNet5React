using EstudoNet5React.Data;
using EstudoNet5React.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace EstudoNet5React.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UsuarioController(ApplicationDbContext context)
        {
            _context = context;

            if (_context.Usuario.Count() == 0)
            {
                _context.Usuario.Add(new Usuario() { Name = "José", Powers = "Testando atividade 01", Hobbies = "Testando Hobbies 01" });
                _context.Usuario.Add(new Usuario() { Name = "Pedro", Powers = "Testando atividade 02", Hobbies = "Testando Hobbies 02" });
                _context.Usuario.Add(new Usuario() { Name = "João", Powers = "Testando atividade 03", Hobbies = "Testando Hobbies 03" });
                _context.Usuario.Add(new Usuario() { Name = "Matheus", Powers = "Testando atividade 04", Hobbies = "Testando Hobbies 04" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public List<Usuario> GetUsuario()
        {
            return _context.Usuario.ToList();
        }

        [HttpGet("[action]/{id}")]
        public Usuario GetUsuario(int id)
        {
            var Usuario = _context.Usuario.Find(id);

            if (Usuario == null)
            {
                return null;
            }
            else
            {
                return Usuario;
            }
        }

        [HttpPost]
        public IActionResult AddUsuario([FromBody] Usuario item)
        {
            _context.Usuario.Add(item);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }

        [HttpPut]
        public IActionResult Update([FromBody] Usuario usuario)
        {
            var UsuarioToUpdate = _context.Usuario.Find(usuario.Id);

            if (UsuarioToUpdate == null)
            {
                return NotFound();
            }

            UsuarioToUpdate.Powers = usuario.Name;

            _context.Usuario.Update(UsuarioToUpdate);
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
            var UsuarioToDelete = _context.Usuario.Find(id);

            if (UsuarioToDelete == null)
            {
                return NotFound();
            }

            _context.Usuario.Remove(UsuarioToDelete);
            _context.SaveChanges();

            return Ok(new
            {
                success = true,
                returncode = "200"
            });
        }
    }
}
