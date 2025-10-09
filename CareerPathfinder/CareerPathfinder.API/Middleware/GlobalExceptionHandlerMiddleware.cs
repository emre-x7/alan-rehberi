using CareerPathfinder.Core.DTOs.Common;
using CareerPathfinder.Core.Exceptions;
using System.Net;
using System.Text.Json;

namespace CareerPathfinder.API.Middleware
{
    public class GlobalExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;
        private readonly IWebHostEnvironment _env;

        public GlobalExceptionHandlerMiddleware(
            RequestDelegate next,
            ILogger<GlobalExceptionHandlerMiddleware> logger,
            IWebHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                LogException(context, ex);
                await HandleExceptionAsync(context, ex);
            }
        }

        private void LogException(HttpContext context, Exception exception)
        {
            var request = context.Request;
            var logMessage = $"Request: {request.Method} {request.Path}";

            _logger.LogError(exception, "Unhandled exception occurred. {LogMessage}", logMessage);
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            HttpStatusCode statusCode;
            string type;
            string message;
            string? detail = null;

            switch (exception)
            {
                case NotFoundException notFoundEx:
                    statusCode = HttpStatusCode.NotFound;
                    type = "Not Found";
                    message = notFoundEx.Message;
                    break;

                case BadRequestException badRequestEx:
                    statusCode = HttpStatusCode.BadRequest;
                    type = "Bad Request";
                    message = badRequestEx.Message;
                    break;

                case UnauthorizedException unauthorizedEx:
                    statusCode = HttpStatusCode.Unauthorized;
                    type = "Unauthorized";
                    message = unauthorizedEx.Message;
                    break;

                default:
                    statusCode = HttpStatusCode.InternalServerError;
                    type = "Internal Server Error";
                    message = "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.";

                    if (_env.IsDevelopment())
                    {
                        detail = exception.ToString();
                    }
                    break;
            }

            _logger.LogError("Exception Type: {Type}, Message: {Message}, StackTrace: {StackTrace}",
                type, exception.Message, exception.StackTrace);

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var errorResponse = new ErrorResponse(type, message, detail);
            var jsonResponse = JsonSerializer.Serialize(errorResponse, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            });

            await context.Response.WriteAsync(jsonResponse);
        }
    }
}