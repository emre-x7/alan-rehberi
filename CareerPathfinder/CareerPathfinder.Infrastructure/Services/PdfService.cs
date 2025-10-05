using CareerPathfinder.Core.DTOs.Careers;
using CareerPathfinder.Core.Services;
using QuestPDF.Drawing;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace CareerPathfinder.Infrastructure.Services
{
    public class PdfService : IPdfService
    {
        public PdfService()
        {
            QuestPDF.Settings.License = LicenseType.Community;
        }

        public async Task<byte[]> GenerateCareerPdfAsync(CareerDetailDto careerDetail)
        {
            // EXPLICIT olarak QuestPDF'in Document'ini kullan
            var document = QuestPDF.Fluent.Document.Create(container =>
            {
                container.Page(page =>
                {
                    page.Size(PageSizes.A4);
                    page.Margin(2, Unit.Centimetre);
                    page.PageColor(Colors.White);
                    page.DefaultTextStyle(x => x.FontSize(12));

                    page.Header()
                        .AlignCenter()
                        .Text($"{careerDetail.CareerName} Kariyer Rehberi")
                        .SemiBold().FontSize(24).FontColor(Colors.Blue.Medium);

                    page.Content()
                        .PaddingVertical(1, Unit.Centimetre)
                        .Column(column =>
                        {
                            column.Spacing(20);

                            // 1. Özet Bölümü
                            column.Item().Background(Colors.Grey.Lighten3).Padding(10).Column(summaryColumn =>
                            {
                                summaryColumn.Item().Text("Kariyer Özeti").SemiBold().FontSize(16);
                                summaryColumn.Item().Text(careerDetail.Summary);
                            });

                            // 2. Çalışma Alanları
                            column.Item().Column(workColumn =>
                            {
                                workColumn.Item().Text("Çalışma Alanları").SemiBold().FontSize(16);
                                workColumn.Item().Text(careerDetail.WorkAreas);
                            });

                            // 3. Maaş Bilgileri
                            column.Item().Column(salaryColumn =>
                            {
                                salaryColumn.Item().Text("Ortalama Maaş Aralıkları").SemiBold().FontSize(16);
                                salaryColumn.Item().Text(careerDetail.AverageSalary);
                            });

                            // 4. Kaynak Önerileri
                            AddResourcesSection(column, "Başlangıç Seviye Kaynaklar", careerDetail.BeginnerResources);
                            AddResourcesSection(column, "Orta Seviye Kaynaklar", careerDetail.IntermediateResources);
                            AddResourcesSection(column, "İleri Seviye Kaynaklar", careerDetail.AdvancedResources);

                            // 5. Proje Önerileri
                            AddProjectsSection(column, careerDetail.ProjectIdeas);
                        });

                    page.Footer()
                        .AlignCenter()
                        .Text(x =>
                        {
                            x.Span("CareerPathfinder - ");
                            x.Span(DateTime.Now.ToString("dd/MM/yyyy"));
                        });
                });
            });

            return document.GeneratePdf();
        }

        private void AddResourcesSection(ColumnDescriptor column, string title, List<ResourceItem> resources)
        {
            if (resources.Any())
            {
                column.Item().Column(resourcesColumn =>
                {
                    resourcesColumn.Item().Text(title).SemiBold().FontSize(16);

                    foreach (var resource in resources)
                    {
                        resourcesColumn.Item().PaddingBottom(5).Column(resourceColumn =>
                        {
                            resourceColumn.Item().Text($"{resource.Title} ({resource.Type})").SemiBold();
                            resourceColumn.Item().Text(resource.Description);
                            resourceColumn.Item().Text($"Link: {resource.Url}").FontColor(Colors.Blue.Medium);
                        });
                    }
                });
            }
        }

        private void AddProjectsSection(ColumnDescriptor column, List<ProjectIdea> projects)
        {
            if (projects.Any())
            {
                column.Item().Column(projectsColumn =>
                {
                    projectsColumn.Item().Text("Proje Önerileri").SemiBold().FontSize(16);

                    foreach (var project in projects)
                    {
                        projectsColumn.Item().PaddingBottom(10).Background(Colors.Grey.Lighten3).Padding(10).Column(projectColumn =>
                        {
                            projectColumn.Item().Text(project.Title).SemiBold().FontSize(14);
                            projectColumn.Item().Text(project.Description);
                            projectColumn.Item().Text($"Zorluk: {project.Difficulty}");
                            projectColumn.Item().Text($"Teknolojiler: {string.Join(", ", project.Technologies)}");
                        });
                    }
                });
            }
        }

        public string GetContentType()
        {
            return "application/pdf";
        }

        public string GetFileName(string careerName)
        {
            return $"{careerName.Replace(" ", "_")}_Kariyer_Rehberi_{DateTime.Now:yyyyMMdd}.pdf";
        }
    }
}