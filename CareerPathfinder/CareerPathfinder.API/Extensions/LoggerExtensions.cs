using Microsoft.Extensions.Logging;

namespace CareerPathfinder.API.Extensions
{
    public static class LoggerExtensions
    {
        public static void LogQuestionnaireStarted(this ILogger logger, int questionnaireId, string userId, string department)
        {
            logger.LogInformation("Questionnaire started - ID: {QuestionnaireId}, User: {UserId}, Department: {Department}",
                questionnaireId, userId, department);
        }

        public static void LogQuestionnaireCompleted(this ILogger logger, int questionnaireId, string userId)
        {
            logger.LogInformation("Questionnaire completed - ID: {QuestionnaireId}, User: {UserId}",
                questionnaireId, userId);
        }

        public static void LogResultsCalculated(this ILogger logger, int questionnaireId, int resultCount)
        {
            logger.LogInformation("Results calculated - Questionnaire: {QuestionnaireId}, ResultCount: {ResultCount}",
                questionnaireId, resultCount);
        }
    }
}