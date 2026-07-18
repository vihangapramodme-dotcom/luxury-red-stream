// TMDB API එක සම්බන්ධ කිරීමට (ඔයාගේ Key එක මෙතනට දාන්න)
const API_KEY = 'ඔයාගේ_TMDB_API_KEY_එක_මෙතනට_දන්න'; 

async function searchMedia() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if(!query) return alert('කරුණාකර නමක් ඇතුළත් කරන්න!');
    
    resultsDiv.innerHTML = '<p class="initial-text">සොයමින් පවතී... කරුණාකර රැඳී සිටින්න...</p>';
    
    try {
        // TMDB Multi-Search API (Movies, TV Shows ඔක්කොම එක පාර සර්ච් වෙනවා)
        const response = await fetch(`https://themoviedb.org{API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        resultsDiv.innerHTML = ''; // පැරණි දත්ත මකන්න
        
        if(data.results.length === 0) {
            resultsDiv.innerHTML = '<p class="initial-text">කිසිවක් හමු වූයේ නැත!</p>';
            return;
        }
        
        data.results.forEach(item => {
            if(item.poster_path) {
                const title = item.title || item.name;
                const poster = `https://tmdb.org{item.poster_path}`;
                
                // VIP Card Layout එක සෑදීම
                const card = document.createElement('div');
                card.className = 'movie-card';
                card.innerHTML = `
                    <img src="${poster}" alt="${title}" style="width:100%; border-radius:10px;">
                    <h3>${title}</h3>
                    <button class="vip-btn" onclick="watchAndDownload('${item.id}', '${item.media_type}')">VIP Watch / Subtitles</button>
                `;
                resultsDiv.appendChild(card);
            }
        });
    } catch (error) {
        resultsDiv.innerHTML = '<p class="initial-text">දෝෂයක් ඇති විය. නැවත උත්සාහ කරන්න.</p>';
    }
}

function watchAndDownload(id, type) {
    // වීඩියෝව සහ උපසිරසි බාගත කරන VIP Player පිටුවට රැගෙන යාම ඉදිරි පියවරේදී බලමු.
    alert(`VIP ID: ${id} (${type}) සඳහා ඉදිරි පියවර ළඟදීම!`);
}
