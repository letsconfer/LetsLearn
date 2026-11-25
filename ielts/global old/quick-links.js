// Central Course Curriculum Mapping
const courseMap = [
    {
        plan: "French Basics - 4 Weeks Plan",
        weeks: [
            {
                weekTitle: "Week 1",
                links: [
                    { title: "French Accents & Alphabets", url: "Basic11.html" },
                    { title: "French Liaison - Elision & Colours / Week Days / Calendar Month Names", url: "Basic12.html" },
                    { title: "French Letter Blends & Phonetics", url: "Basic13.html" },
                    { title: "French Vowels & Essential Expressions", url: "Basic14.html" },
                    { title: "French Conversational Expressions", url: "Basic15.html" },
                    { title: "French Beginner Conversational Guide", url: "Basic16.html" },
                    { title: "French Gender Rules & Vocabulary", url: "Basic17.html" }

                ]
            },
            {
                weekTitle: "Week 2",
                links: [
                    { title: "Week 2 - Content Coming Soon", url: "Home.html" }
                ]
            }
        ]
    },
    {
        plan: "French B1 - 6 Weeks Plan",
        weeks: [
            {
                weekTitle: "Week 1",
                links: [
                    { title: "Lesson B1-1", url: "LevelB111.html" },
                    { title: "Lesson B1-2", url: "LevelB112.html" },
                    { title: "Lesson B1-3", url: "LevelB113.html" },
                    { title: "Lesson B1-4", url: "LevelB114.html" },
                    { title: "Lesson B1-5", url: "LevelB115.html" }
                ]
            }
        ]
    }
];

// Algorithm to locate current page and render Quick Links
function renderQuickLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'Language.html';
    const container = document.getElementById('quick-links-container');

    if (!container) return;

    let matchedWeek = null;
    let matchedPlan = null;

    // Search through plans & weeks
    for (const planObj of courseMap) {
        for (const weekObj of planObj.weeks) {
            const found = weekObj.links.some(item => item.url.toLowerCase() === currentPage.toLowerCase());
            if (found) {
                matchedPlan = planObj.plan;
                matchedWeek = weekObj;
                break;
            }
        }
        if (matchedWeek) break;
    }

    if (!matchedWeek) {
        container.style.display = 'none';
        return;
    }

    // Build Quick Links HTML
    let linksHTML = `
        <div class="quick-links-card" style="background: var(--card-bg, #ffffff); border: 1px solid var(--border-color, #dee2e6); border-radius: 8px; padding: 15px; margin-bottom: 20px;">
            <div style="font-weight: 700; font-size: 11pt; color: var(--primary-color, #0055A5); border-bottom: 2px solid var(--border-color, #dee2e6); padding-bottom: 6px; margin-bottom: 10px; text-transform: uppercase;">
                ⚡ Quick Links (${matchedWeek.weekTitle})
            </div>
            <ul style="list-style: none; padding: 0; margin: 0;">
    `;

    matchedWeek.links.forEach(item => {
        const isActive = item.url.toLowerCase() === currentPage.toLowerCase();
        linksHTML += `
            <li style="margin-bottom: 6px;">
                <a href="${item.url}" style="text-decoration: none; font-size: 9.5pt; font-weight: ${isActive ? 'bold' : 'normal'}; color: ${isActive ? 'var(--secondary-color, #EF4135)' : 'var(--primary-color, #0055A5)'};">
                    ${isActive ? '👉 ' : '• '}${item.title}
                </a>
            </li>
        `;
    });

    linksHTML += `
            </ul>
        </div>
    `;

    container.innerHTML = linksHTML;
}

document.addEventListener('DOMContentLoaded', renderQuickLinks);