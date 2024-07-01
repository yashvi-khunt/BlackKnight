namespace BK.BLL.Helper;
using System.ComponentModel;
using System.Text.Json;

public class Response : Response<object>
{

    public Response() : base() { }

    public Response(string message, bool isSuccess = true) : base(message, isSuccess)
    {
        Message = message;
        Success = isSuccess;
    }
}

public class Response<T>
    {
        public bool Success { get; set; } = true;
        public T? Data { get; set; }
        public string? Message { get; set; }
        

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }

        public Response()
        {
        }

        public Response(T data)
        {
            Data = data;
            Message = "Data loaded successfully!";
        }

        public Response(string message, bool isSuccess = true)
        {
            Message = message;
            Success = isSuccess;
        }

        public Response(T data, bool isSuccess, string message)
        {
            Message = message;
            Success = isSuccess;
            Data = data;
        }
    }

    public class ResponseError
    {
        public long ErrorCode { get; set; }
        public string? ErrorMessage { get; set; }



        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }

    }
