class Cat {
    constructor(treatType) {
        this.treatType = treatType;
        this.id = Date.now();
        this.rarity = this.determineRarity();
        this.color = this.randomColor(this.rarity);
        this.name = '';
        this.pattern = this.randomPattern(this.rarity);
        this.earStyle = this.randomEarStyle();
        this.tailStyle = this.randomTailStyle();
        this.stats = this.generateStats(treatType, this.rarity);
        this.behavior = this.generateBehavior(treatType);
    }

    determineRarity() {
       
        if (this.treatType === 'premium') {
            const rarities = ['divine', 'legendary', 'epic'];
            return rarities[Math.floor(Math.random() * rarities.length)];
        }

 
        const roll = Math.random() * 100;
        let sum = 0;
        for (const [rarity, chance] of Object.entries(CatTypes.rarityChances)) {
            sum += chance;
            if (roll < sum) return rarity;
        }
        return 'common';
    }

    randomColor(rarity) {
        const colors = CatTypes.colors[rarity];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    randomPattern(rarity) {
        const patterns = CatTypes.patterns[rarity];
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    randomEarStyle() {
        const ears = ['pointed', 'rounded', 'folded'];
        return ears[Math.floor(Math.random() * ears.length)];
    }

    randomTailStyle() {
        const tails = ['long', 'short', 'curved'];
        return tails[Math.floor(Math.random() * tails.length)];
    }

    generateStats(treatType) {
        // Rarity multipliers
        const rarityMultipliers = {
            divine: 3,    // 3x base stats
            epic: 2.5,    // 2.5x base stats
            legendary: 2, // 2x base stats
            rare: 1.5,   // 1.5x base stats
            uncommon: 1.2, // 1.2x base stats
            common: 1     // normal stats
        };

        const multiplier = rarityMultipliers[this.rarity];
        
        const baseStats = {
            strength: Math.floor((Math.random() * 5 + 1) * multiplier),
            agility: Math.floor((Math.random() * 5 + 1) * multiplier),
            intelligence: Math.floor((Math.random() * 5 + 1) * multiplier),
            charm: Math.floor((Math.random() * 5 + 1) * multiplier)
        };

        // Boost stat based on treat
        if (treatType) {
            baseStats[treatType] += 2;
        }

        return baseStats;
    }

    generateBehavior(treatType) {
        const behaviors = {
            meat: ['Loves to exercise', 'Very energetic', 'Protective'],
            bits: ['Playful', 'Quick reflexes', 'Acrobatic'],
            fish: ['Problem solver', 'Curious', 'Strategic'],
            sugar: ['Affectionate', 'Social butterfly', 'Charming'],
            premium: ['Majestic', 'Royal', 'Mythical', 'Legendary', 'Divine'] 
        };

        return behaviors[treatType]?.[Math.floor(Math.random() * (behaviors[treatType]?.length || 3))] || 'Unknown';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let cats = loadCats(); // Load cats at the start

    const bowl = document.getElementById('bowl');
    const treatSelector = document.getElementById('treatSelector');
    const loadingScreen = document.getElementById('loadingScreen');
    const inventory = document.getElementById('inventory');

    bowl.addEventListener('click', () => {
        treatSelector.style.display = 'block';
        const sortSelect = document.getElementById('sortBy');
        if (sortSelect) {
            sortSelect.addEventListener('change', function(e) {
                const sortBy = e.target.value;
                
                cats.sort((a, b) => {
                    switch(sortBy) {
                        case 'newest':
                            return b.id - a.id;
                        case 'rarity':
                            const rarityOrder = { divine: 6, legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
                            return rarityOrder[b.rarity] - rarityOrder[a.rarity];
                        case 'strength':
                            return b.stats.strength - a.stats.strength;
                        case 'agility':
                            return b.stats.agility - a.stats.agility;
                        case 'intelligence':
                            return b.stats.intelligence - a.stats.intelligence;
                        case 'charm':
                            return b.stats.charm - a.stats.charm;
                        default:
                            return 0;
                    }
                });
                
                loadSavedCats(); // Refresh the display
            });
        }
        loadSavedCats();
    });

    document.querySelectorAll('.treat').forEach(treat => {
        treat.addEventListener('click', () => {
            const treatType = treat.dataset.treat;
            const bonus = treat.dataset.bonus;
            
            treatSelector.style.display = 'none';
            loadingScreen.style.display = 'block';

            setTimeout(() => {
                loadingScreen.style.display = 'none';
                createCat(treatType, treatType); 
            }, Math.random() * 5000 + 5000);
        });
    });

    function createCat(treatType, bonus) {
        const cat = new Cat(bonus);
        cats.push(cat);
        saveCats();
        displayCat(cat);
    }

    function displayCat(cat) {
        const catCard = document.createElement('div');
        catCard.className = 'cat-card';
        const catSVG = generateCatSVG(cat);
        
        const rarityColors = {
            divine: '#E0FFFF',    // Light cyan
            legendary: '#FFD700',  // Gold
            epic: '#9400D3',      // Dark violet
            rare: '#4169E1',      // Royal blue
            uncommon: '#2ecc71',  // Emerald green
            common: '#777777'     // Gray
        };
        
        catCard.innerHTML = `
            <div class="rarity-badge" style="background: ${rarityColors[cat.rarity]}">
                ${cat.rarity}
            </div>
            ${catSVG}
            <div class="cat-name">
                <input type="text" placeholder="Name your cat" maxlength="20" value="${cat.name}">
            </div>
            <div class="cat-stats">
                <div style="color: ${rarityColors[cat.rarity]}; font-weight: bold; font-size: 16px; margin-bottom: 10px;">
                    Stats
                </div>
                <div>⚔️ Strength: ${cat.stats.strength}⭐</div>
                <div>🏃 Agility: ${cat.stats.agility}⭐</div>
                <div>🧠 Intelligence: ${cat.stats.intelligence}⭐</div>
                <div>✨ Charm: ${cat.stats.charm}⭐</div>
                <div style="margin-top: 10px; font-style: italic;">
                    "${cat.behavior || 'Unknown'}"
                </div>
            </div>
        `;

        const nameInput = catCard.querySelector('input');
        nameInput.addEventListener('change', (e) => {
            cat.name = e.target.value;
            saveCats();
        });

        inventory.appendChild(catCard);
    }

    function generateCatSVG(cat) {
        let patternSVG = '';
        switch(cat.pattern) {
            case 'spots':
                patternSVG = `<circle cx="45" cy="45" r="4" fill="white" opacity="0.3"/>
                             <circle cx="55" cy="55" r="4" fill="white" opacity="0.3"/>`;
                break;
            case 'stripes':
                patternSVG = `<path d="M30,45 L70,45" stroke="white" opacity="0.3" stroke-width="3"/>`;
                break;
            case 'mask':
                patternSVG = `<path d="M35,25 Q50,35 65,25" fill="white" opacity="0.3"/>`;
                break;
            case 'star':
                patternSVG = `<path d="M45,35 L50,25 L55,35 L65,30 L55,40 L60,50 L50,45 L40,50 L45,40 L35,30 Z" fill="white" opacity="0.5"/>`;
                break;
            case 'heart':
                patternSVG = `<path d="M50,45 L45,35 Q40,30 45,25 Q50,20 50,25 Q50,20 55,25 Q60,30 55,35 Z" fill="#FF69B4" opacity="0.5"/>`;
                break;
            case 'crown':
                patternSVG = `<path d="M40,20 L45,15 L50,20 L55,15 L60,20" stroke="#FFD700" stroke-width="2" fill="none"/>`;
                break;
            case 'rainbow':
                patternSVG = `
                    <defs>
                        <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:0.3"/>
                            <stop offset="50%" style="stop-color:rgb(0,255,0);stop-opacity:0.3"/>
                            <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:0.3"/>
                        </linearGradient>
                    </defs>
                    <path d="M25,40 L75,40 L75,80 L25,80 Z" fill="url(#rainbow)"/>`;
                break;
            case 'galaxy':
                patternSVG = `
                    <circle cx="45" cy="45" r="1" fill="white"/>
                    <circle cx="55" cy="35" r="1" fill="white"/>
                    <circle cx="35" cy="55" r="1" fill="white"/>
                    <circle cx="65" cy="50" r="1" fill="white"/>
                    <circle cx="40" cy="60" r="1" fill="white"/>`;
                break;
            case 'flames':
                patternSVG = `<path d="M30,70 Q40,60 50,70 Q60,60 70,70" stroke="#FF4500" stroke-width="3" fill="none" opacity="0.5"/>`;
                break;
        }

        
        const rarityColors = {
            divine: '#E0FFFF',    // Light cyan
            legendary: '#FFD700',  // Gold
            epic: '#9400D3',      // Dark violet
            rare: '#4169E1',      // Royal blue
            uncommon: '#2ecc71',  // Emerald green
            common: '#777777'     // Gray
        };

        return `
            <svg width="100" height="100" viewBox="0 0 100 100">
                <!-- Rarity Glow -->
                <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>
                
                <!-- Body with rarity glow -->
                <g filter="url(#glow)" style="filter: drop-shadow(0 0 3px ${rarityColors[cat.rarity]})">
                    <!-- Main body shape -->
                    <path d="M25,40 L75,40 L75,80 L25,80 Z" fill="${cat.color}"/>
                    
                    <!-- Head - more rounded -->
                    <path d="M30,20 Q50,15 70,20 L70,45 L30,45 Q30,35 30,20" fill="${cat.color}"/>
                    
                    <!-- Ears - more triangular -->
                    <path d="M35,20 L25,5 L45,20 M65,20 L75,5 L55,20" fill="${cat.color}"/>
                </g>

                <!-- Face features -->
                <!-- Eyes with pupils -->
                <circle cx="40" cy="30" r="5" fill="black"/>
                <circle cx="60" cy="30" r="5" fill="black"/>
                <circle cx="42" cy="28" r="2" fill="white"/>
                <circle cx="62" cy="28" r="2" fill="white"/>
                
                <!-- Nose -->
                <path d="M48,35 L52,35 L50,38 Z" fill="pink"/>
                
                <!-- Whiskers -->
                <path d="M25,35 L45,33 M25,38 L45,38 M25,41 L45,43" stroke="white" stroke-width="1"/>
                <path d="M55,33 L75,35 M55,38 L75,38 M55,43 L75,41" stroke="white" stroke-width="1"/>
                
                <!-- Mouth -->
                <path d="M45,40 Q50,42 55,40" stroke="white" stroke-width="1" fill="none"/>

                <!-- Black band -->
                <path d="M25,45 L75,45" stroke="black" stroke-width="4"/>
                
                <!-- Tail - more curved -->
                <path d="M75,60 Q90,60 85,40" stroke="${cat.color}" stroke-width="10" fill="none"/>
                
                <!-- Legs with paw details -->
                <rect x="35" y="80" width="10" height="10" fill="${cat.color}"/>
                <rect x="55" y="80" width="10" height="10" fill="${cat.color}"/>
                <path d="M35,90 Q40,92 45,90 M55,90 Q60,92 65,90" stroke="#FFE4E1" stroke-width="1"/>
                
                ${patternSVG}
            </svg>
        `;
    }

    function generateEars(style) {
        switch(style) {
            case 'pointed':
                return `<path d="M30,20 L40,30 M70,20 L60,30" fill="none" stroke="currentColor" stroke-width="4"/>`;
            case 'rounded':
                return `<path d="M30,20 Q35,25 40,30 M70,20 Q65,25 60,30" fill="none" stroke="currentColor" stroke-width="4"/>`;
            case 'folded':
                return `<path d="M35,25 L40,30 M65,25 L60,30" fill="none" stroke="currentColor" stroke-width="4"/>`;
        }
    }

    function generateTail(style) {
        switch(style) {
            case 'long':
                return `<path d="M80,60 Q90,70 85,80" fill="none" stroke="currentColor" stroke-width="4"/>`;
            case 'short':
                return `<path d="M80,60 Q85,65 83,70" fill="none" stroke="currentColor" stroke-width="4"/>`;
            case 'curved':
                return `<path d="M80,60 Q90,65 85,75 Q80,85 75,80" fill="none" stroke="currentColor" stroke-width="4"/>`;
        }
    }

    function saveCats() {
        localStorage.setItem('cats', JSON.stringify(cats));
    }

    function loadCats() {
        const savedCats = localStorage.getItem('cats');
        return savedCats ? JSON.parse(savedCats) : [];
    }

    function updateCatName(catId, newName) {
        const cat = cats.find(c => c.id === catId);
        if (cat) {
            cat.name = newName;
            saveCats();
        }
    }


    function loadSavedCats() {
        inventory.innerHTML = ''; 
        cats.forEach(savedCat => {
            const catCard = document.createElement('div');
            catCard.className = 'cat-card';
            const catSVG = generateCatSVG(savedCat);
            
            const rarityColors = {
                divine: '#E0FFFF',    // Light cyan
                legendary: '#FFD700',  // Gold
                epic: '#9400D3',      // Dark violet
                rare: '#4169E1',      // Royal blue
                uncommon: '#2ecc71',  // Emerald green
                common: '#777777'     // Gray
            };
            
            catCard.innerHTML = `
                <div class="rarity-badge" style="background: ${rarityColors[savedCat.rarity]}">
                    ${savedCat.rarity}
                </div>
                ${catSVG}
                <div class="cat-name">
                    <input type="text" placeholder="Name your cat" maxlength="20" value="${savedCat.name}">
                </div>
                <div class="cat-stats">
                    <div style="color: ${rarityColors[savedCat.rarity]}; font-weight: bold; font-size: 16px; margin-bottom: 10px;">
                        Stats
                    </div>
                    <div>⚔️ Strength: ${savedCat.stats.strength}⭐</div>
                    <div>🏃 Agility: ${savedCat.stats.agility}⭐</div>
                    <div>🧠 Intelligence: ${savedCat.stats.intelligence}⭐</div>
                    <div>✨ Charm: ${savedCat.stats.charm}⭐</div>
                    <div>Behavior: ${savedCat.behavior || 'Unknown'}</div>
                </div>
            `;

            const nameInput = catCard.querySelector('input');
            nameInput.addEventListener('change', (e) => {
                const cat = cats.find(c => c.id === savedCat.id);
                if (cat) {
                    cat.name = e.target.value;
                    saveCats();
                }
            });

            inventory.appendChild(catCard);
        });
    }

 
    window.clearSavedCats = function() {
        localStorage.removeItem('cats');
        window.cats = [];
        const inventory = document.getElementById('inventory');
        if (inventory) {
            inventory.innerHTML = '';
        }
        console.log('All cats have been cleared');
    }

});


loadSavedCats();

const sortSelect = document.getElementById('sortBy');
if (sortSelect) {
    sortSelect.addEventListener('change', function(e) {
        const sortBy = e.target.value;
        
        cats.sort((a, b) => {
            switch(sortBy) {
                case 'newest':
                    return a.id - b.id;
                case 'rarity':
                    const rarityOrder = { divine: 6, legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
                    return rarityOrder[b.rarity] - rarityOrder[a.rarity];
                case 'strength':
                    return b.stats.strength - a.stats.strength;
                case 'agility':
                    return b.stats.agility - a.stats.agility;
                case 'intelligence':
                    return b.stats.intelligence - a.stats.intelligence;
                case 'charm':
                    return b.stats.charm - a.stats.charm;
                default:
                    return 0;
            }
        });
        
        loadSavedCats(); // Refresh the display
    });
}
