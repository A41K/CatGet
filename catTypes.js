// Cat Types and Rarities Configuration
const CatTypes = {
    // Rarity Chances (total 100%)
    rarityChances: {
        divine: 0.1,     // 0.1%
        epic: 0.4,       // 0.4%
        legendary: 1,     // 1%
        rare: 4,         // 4%
        uncommon: 15,    // 15%
        common: 79.5     // 79.5%
    },

    // Colors for each rarity
    colors: {
        divine: ['#FFFFFF', '#E6E6FA', '#FFE4E1', '#F0E68C'],
        legendary: ['#FF4500', '#00FF00', '#4169E1', '#FF1493'],
        epic: ['#9400D3', '#8A2BE2', '#9370DB', '#BA55D3'],
        rare: ['#FFD700', '#9370DB', '#48D1CC', '#FF69B4'],
        uncommon: ['#483D8B', '#8B4513', '#556B2F', '#4682B4'],
        common: ['#808080', '#696969', '#A9A9A9', '#778899']
    },

    // Single rarity colors for UI badges and highlights
    rarityColors: {
        divine: '#E0FFFF',    // Light cyan
        legendary: '#FFD700',  // Gold
        epic: '#9400D3',      // Dark violet
        rare: '#4169E1',      // Royal blue
        uncommon: '#2ecc71',  // Emerald green
        common: '#777777'     // Gray
    },

    // Patterns for each rarity
    patterns: {
        divine: [
            'celestial', 'ethereal', 'divine-aura', 'holy-symbols', 
            'constellation', 'aurora', 'stardust', 'cosmic-swirl',
            'angel-wings', 'divine-runes', 'heavenly-glow', 'sacred-geometry'
        ],
        epic: [
            'phoenix', 'dragon', 'crystal', 'ancient-runes',
            'mystic-symbols', 'void-ripples', 'plasma-waves', 'thunderbolt',
            'frost-patterns', 'magma-cracks', 'spirit-flames', 'arcane-circles'
        ],
        legendary: [
            'rainbow', 'galaxy', 'flames', 'lightning',
            'nebula', 'northern-lights', 'golden-spirals', 'diamond-sparkles',
            'prism-refraction', 'meteor-shower', 'solar-flares', 'starfall'
        ],
        rare: [
            'star', 'heart', 'crown', 'moon',
            'butterfly', 'flower-petals', 'music-notes', 'snowflakes',
            'autumn-leaves', 'ocean-waves', 'cloud-wisps', 'gem-facets'
        ],
        uncommon: [
            'socks', 'mask', 'belly', 'tiger-stripes',
            'leopard-spots', 'zebra-stripes', 'paw-prints', 'fish-scales',
            'marble-swirls', 'geometric', 'checker', 'polka-dots'
        ],
        common: [
            'none', 'spots', 'stripes', 'patches',
            'solid', 'bicolor', 'tuxedo', 'tabby',
            'calico', 'tortoise', 'pointed', 'speckled'
        ]
    },

    // Rarity colors for UI
    rarityColors: {
        divine: ['#FFFFFF80', '#E6E6FA80', '#FFE4E180', '#F0E68C80'],
        epic: ['#9400D3', '#8A2BE2', '#9370DB', '#BA55D3'],
        legendary: ['#FFD700', '#FFA500', '#FF4500', '#FF1493'],
        rare: ['#20B2AA', '#48D1CC', '#40E0D0', '#00CED1'],
        uncommon: ['#556B2F', '#8B4513', '#A0522D', '#6B8E23'],
        common: ['#808080', '#696969', '#A9A9A9', '#778899']
    },

    // Special effects for each rarity
    effects: {
        divine: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%), repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 10%)',
        epic: 'linear-gradient(45deg, rgba(148,0,211,0.4) 0%, rgba(138,43,226,0.4) 50%, rgba(148,0,211,0.4) 100%)',
        legendary: 'drop-shadow(0 0 8px gold) drop-shadow(0 0 4px yellow)',
        rare: 'drop-shadow(0 0 5px blue) drop-shadow(0 0 3px cyan)',
        uncommon: 'drop-shadow(0 0 4px green)',
        common: 'none'
    }
};

// Don't forget to add this line in your HTML file:
// <script src="catTypes.js"></script>