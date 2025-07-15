// Helper functions to get and set cookies
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Function to get the week number of the year
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

// Core view counting logic
function trackView() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const thisWeek = now.getFullYear() + '-' + getWeekNumber(now);
  const thisMonth = now.getFullYear() + '-' + (now.getMonth() + 1);
  const thisYear = now.getFullYear();

  // Get last visit timestamp
  const lastVisit = getCookie('lastVisit');
  setCookie('lastVisit', now.toISOString(), 365); // Update last visit

  // All-Time Views
  let allTimeViews = parseInt(getCookie('allTimeViews') || '0', 10);
  if (!lastVisit) { // Only count new visitors for all-time
      allTimeViews++;
  }
  setCookie('allTimeViews', allTimeViews, 365 * 10); // 10-year cookie

  // Daily Views
  let dailyViewsData = JSON.parse(getCookie('dailyViews') || '{}');
  if (dailyViewsData.date !== today) {
    dailyViewsData = { date: today, count: 0 };
  }
  dailyViewsData.count++;
  setCookie('dailyViews', JSON.stringify(dailyViewsData), 1);

  // Weekly Views
  let weeklyViewsData = JSON.parse(getCookie('weeklyViews') || '{}');
  if (weeklyViewsData.week !== thisWeek) {
    weeklyViewsData = { week: thisWeek, count: 0 };
  }
  weeklyViewsData.count++;
  setCookie('weeklyViews', JSON.stringify(weeklyViewsData), 7);

  // Monthly Views
  let monthlyViewsData = JSON.parse(getCookie('monthlyViews') || '{}');
  if (monthlyViewsData.month !== thisMonth) {
    monthlyViewsData = { month: thisMonth, count: 0 };
  }
  monthlyViewsData.count++;
  setCookie('monthlyViews', JSON.stringify(monthlyViewsData), 30);

  // Yearly Views
  let yearlyViewsData = JSON.parse(getCookie('yearlyViews') || '{}');
  if (yearlyViewsData.year !== thisYear) {
    yearlyViewsData = { year: thisYear, count: 0 };
  }
  yearlyViewsData.count++;
  setCookie('yearlyViews', JSON.stringify(yearlyViewsData), 365);

  return {
      daily: dailyViewsData.count,
      weekly: weeklyViewsData.count,
      monthly: monthlyViewsData.count,
      yearly: yearlyViewsData.count,
      allTime: allTimeViews
  };
}

function displayViews(views) {
  document.getElementById('daily-views').textContent = views.daily;
  document.getElementById('weekly-views').textContent = views.weekly;
  document.getElementById('monthly-views').textContent = views.monthly;
  document.getElementById('yearly-views').textContent = views.yearly;
  document.getElementById('all-time-views').textContent = views.allTime;
}

document.addEventListener('DOMContentLoaded', () => {
  const views = trackView();
  displayViews(views);
});
