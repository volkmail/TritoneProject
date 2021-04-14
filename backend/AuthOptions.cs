using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace TritonBackend
{
    public class AuthOptions
    {
        public string Issuer { get; set; } // Тот, кто сгенерировал токен
        public string Audience { get; set; } // Для кого предназначается токен
        public string Secret { get; set; } // Секретная строка для генерации ключа
        public int TokenLifetime { get; set; } // Время жизни токена

        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Secret));
        }
    }
}
