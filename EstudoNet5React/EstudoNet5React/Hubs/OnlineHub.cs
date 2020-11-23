using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace EstudoNet5React.Hubs
{
    public class OnlineHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
