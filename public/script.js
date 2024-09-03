let currentUserId = '1234';  // נשתמש במזהה קבוע לצורך הדגמה

async function showProfile() {
    try {
        const response = await fetch(`/api/profile?user_id=${currentUserId}`);
        const profile = await response.json();
        let profileHtml = `
            <h2>הפרופיל שלי</h2>
            <form id="profileForm">
                <input type="text" id="name" value="${profile.name || ''}" placeholder="שם">
                <input type="number" id="age" value="${profile.age || ''}" placeholder="גיל">
                <textarea id="dietaryPreferences" placeholder="העדפות תזונתיות">${profile.dietaryPreferences || ''}</textarea>
                <button type="submit">עדכן פרופיל</button>
            </form>
        `;
        document.getElementById('mainContent').innerHTML = profileHtml;
        document.getElementById('profileForm').addEventListener('submit', updateProfile);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = '<p>אירעה שגיאה בטעינת הפרופיל.</p>';
    }
}

async function updateProfile(event) {
    event.preventDefault();
    const profileData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        dietaryPreferences: document.getElementById('dietaryPreferences').value
    };
    try {
        const response = await fetch('/api/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: currentUserId, profile: profileData }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('אירעה שגיאה בעדכון הפרופיל.');
    }
}

async function showMealPlan() {
    try {
        const response = await fetch(`/api/meal-plan?user_id=${currentUserId}`);
        const mealPlan = await response.json();
        let mealPlanHtml = `
            <h2>תוכנית התזונה שלי</h2>
            <form id="mealPlanForm">
                <textarea id="breakfast" placeholder="ארוחת בוקר">${mealPlan.breakfast || ''}</textarea>
                <textarea id="lunch" placeholder="ארוחת צהריים">${mealPlan.lunch || ''}</textarea>
                <textarea id="dinner" placeholder="ארוחת ערב">${mealPlan.dinner || ''}</textarea>
                <button type="submit">עדכן תוכנית תזונה</button>
            </form>
        `;
        document.getElementById('mainContent').innerHTML = mealPlanHtml;
        document.getElementById('mealPlanForm').addEventListener('submit', updateMealPlan);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = '<p>אירעה שגיאה בטעינת תוכנית התזונה.</p>';
    }
}

async function updateMealPlan(event) {
    event.preventDefault();
    const mealPlanData = {
        breakfast: document.getElementById('breakfast').value,
        lunch: document.getElementById('lunch').value,
        dinner: document.getElementById('dinner').value
    };
    try {
        const response = await fetch('/api/meal-plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: currentUserId, meal_plan: mealPlanData }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('אירעה שגיאה בעדכון תוכנית התזונה.');
    }
}

async function showNutrientTracking() {
    try {
        const response = await fetch(`/api/nutrient-tracking?user_id=${currentUserId}`);
        const tracking = await response.json();
        let trackingHtml = `
            <h2>מעקב תזונתי</h2>
            <form id="nutrientForm">
                <input type="number" id="calories" value="${tracking.calories || ''}" placeholder="קלוריות">
                <input type="number" id="protein" value="${tracking.protein || ''}" placeholder="חלבון (גרם)">
                <input type="number" id="carbs" value="${tracking.carbs || ''}" placeholder="פחמימות (גרם)">
                <input type="number" id="fats" value="${tracking.fats || ''}" placeholder="שומנים (גרם)">
                <button type="submit">עדכן מעקב תזונתי</button>
            </form>
        `;
        document.getElementById('mainContent').innerHTML = trackingHtml;
        document.getElementById('nutrientForm').addEventListener('submit', updateNutrientTracking);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = '<p>אירעה שגיאה בטעינת המעקב התזונתי.</p>';
    }
}

async function updateNutrientTracking(event) {
    event.preventDefault();
    const trackingData = {
        calories: document.getElementById('calories').value,
        protein: document.getElementById('protein').value,
        carbs: document.getElementById('carbs').value,
        fats: document.getElementById('fats').value
    };
    try {
        const response = await fetch('/api/nutrient-tracking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: currentUserId, tracking: trackingData }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('אירעה שגיאה בעדכון המעקב התזונתי.');
    }
}

async function showHealthMetrics() {
    try {
        const response = await fetch(`/api/health-metrics?user_id=${currentUserId}`);
        const metrics = await response.json();
        let metricsHtml = `
            <h2>מדדי בריאות</h2>
            <form id="healthForm">
                <input type="number" id="weight" value="${metrics.weight || ''}" placeholder="משקל (ק״ג)">
                <input type="number" id="height" value="${metrics.height || ''}" placeholder="גובה (ס״מ)">
                <input type="number" id="bloodPressure" value="${metrics.bloodPressure || ''}" placeholder="לחץ דם (סיסטולי)">
                <input type="number" id="bloodSugar" value="${metrics.bloodSugar || ''}" placeholder="רמת סוכר בדם (mg/dL)">
                <button type="submit">עדכן מדדי בריאות</button>
            </form>
        `;
        document.getElementById('mainContent').innerHTML = metricsHtml;
        document.getElementById('healthForm').addEventListener('submit', updateHealthMetrics);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('mainContent').innerHTML = '<p>אירעה שגיאה בטעינת מדדי הבריאות.</p>';
    }
}

async function updateHealthMetrics(event) {
    event.preventDefault();
    const metricsData = {
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        bloodPressure: document.getElementById('bloodPressure').value,
        bloodSugar: document.getElementById('bloodSugar').value
    };
    try {
        const response = await fetch('/api/health-metrics', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_id: currentUserId, metrics: metricsData }),
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('אירעה שגיאה בעדכון מדדי הבריאות.');
    }
}

function showRecipes() {
    document.getElementById('mainContent').innerHTML = '<h2>מתכונים</h2><p>תכונה זו תהיה זמינה בקרוב.</p>';
}

function showCommunity() {
    document.getElementById('mainContent').innerHTML = '<h2>קהילה</h2><p>תכונה זו תהיה זמינה בקרוב.</p>';
}

window.onload = function() {
    document.getElementById('mainContent').innerHTML = '<h2>ברוכים הבאים! בחרו אפשרות מהתפריט.</h2>';
};