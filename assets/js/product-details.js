// Befach — Product page tabs: Origin Story · Additional Info · Ingredients
//
// Keyed by product id from products.js. Every field is optional:
//   originStory  — full origin story (paragraphs separated by blank lines).
//                  Falls back to product.story when absent.
//   region       — "Geographical Region" row in Additional Info.
//   gi           — { appNo, year, number } GI registration facts.
//                  When absent, the GI year is read from a "GI Tag: YYYY" key fact.
//   extraInfo    — additional [label, value] rows for Additional Info.
//   ingredients  — list of ingredients.
//   allergens    — allergen statement shown under the ingredients.
//
// GI registration facts (application no., year awarded, GI number) for the 14 products
// that are also listed on gitagged.com were taken from those product pages (Nov 2026).
// The origin stories for those products were written for Befach using the same facts.

const PRODUCT_DETAILS = {
  // ============ BEFACH SPECIAL ============
  'befach-low-diabetic-rice': {
    region: 'India',
    ingredients: ['Low-GI rice (Oryza sativa)'],
  },

  // ============ RICE ============
  'basmati-rice': {
    region: 'Indo-Gangetic plains — Punjab, Haryana, Himachal Pradesh, Delhi, Uttarakhand, western Uttar Pradesh and Jammu & Kashmir',
    gi: { appNo: '145', year: '2016', number: '238th' },
    ingredients: ['Basmati rice (Oryza sativa)'],
    originStory: `There is a moment, just before a Basmati grain swells in boiling water, when the kitchen catches a scent that has travelled centuries — through Mughal courts, through grandmothers' brass pots, through wedding feasts under tents. That scent is its signature.

Even the name carries it. Basmati is usually traced to the Sanskrit vas, meaning aroma — it is, quite literally, the fragrant one. That fragrance is not added; it is the sum of three things working together: the land the rice grows in, the way it is harvested, and the way it is processed after.

The Indo-Gangetic plains — fed by Himalayan snowmelt and held by alluvial soil — grow this rice in conditions that simply cannot be replicated elsewhere. Try to grow Basmati outside this belt and it forgets how to smell like itself.

In the pot, a true Basmati grain does what ordinary rice cannot. It grows in length rather than width as it cooks — slender, separate and fluffy, never clumping into a mass.

Given its GI tag in 2016 after a long legal battle to protect it from imitators abroad, Basmati is more than a grain. It is the proof that the land you are grown on, decides who you are.`,
  },
  'seeraga-samba': {
    region: 'Tamil Nadu',
    ingredients: ['Seeraga Samba rice (Oryza sativa)'],
  },
  'ambemohar-rice': {
    region: 'Pune district, Maharashtra',
    ingredients: ['Ambemohar rice (Oryza sativa)'],
  },
  'gobindobhog-rice': {
    region: 'Purba Bardhaman (Burdwan), West Bengal',
    ingredients: ['Gobindobhog rice (Oryza sativa)'],
  },

  // ============ WHEAT ============
  'sharbati-gehu': {
    region: 'Sehore, Vidisha & Ashoknagar, Madhya Pradesh',
    ingredients: ['Sharbati wheat (Triticum aestivum)'],
    allergens: 'Contains gluten (wheat).',
  },

  // ============ MILLETS ============
  'dagdi-jowar-jalna': {
    region: 'Jalna district, Maharashtra',
    ingredients: ['Dagdi jowar — sorghum (Sorghum bicolor)'],
  },
  'mangalwedha-jowar': {
    region: 'Mangalwedha taluka, Solapur district, Maharashtra',
    ingredients: ['Mangalwedha jowar — sorghum (Sorghum bicolor)'],
  },

  // ============ PULSES & LEGUMES ============
  'gurez-rajmash': {
    region: 'Gurez Valley, Jammu & Kashmir',
    ingredients: ['Gurez rajmash — red kidney beans (Phaseolus vulgaris)'],
  },
  'thalanadan-grambu': {
    region: 'Thalanad, Kerala',
    ingredients: ['Thalanadan grambu — clove (Syzygium aromaticum)'],
  },
  'amravati-chana': {
    region: 'Amravati district (Vidarbha), Maharashtra',
    ingredients: ['Amravati chana — Bengal gram (Cicer arietinum)'],
  },
  'borsuri-tur-dal': {
    region: 'Borsuri village, Latur district, Maharashtra',
    ingredients: ['Borsuri tur dal — pigeon pea (Cajanus cajan)'],
  },
  'gulbarga-tur-dal': {
    region: 'Kalaburagi (Gulbarga) district, Karnataka',
    gi: { appNo: '593', year: '2019', number: '353rd' },
    ingredients: ['Gulbarga tur dal — pigeon pea (Cajanus cajan)'],
    originStory: `Gulbarga, on the Deccan plateau, has the kind of black soil and dry heat that tur dal seems to love. The result is a tur that is darker, more savoury, and cooks down into a dal so rich you could mistake it for a stew.

Kalaburagi — as Gulbarga is now officially known — is called the pigeon-pea bowl of Karnataka. The district is warm, dry and almost entirely rain-fed, and its soils are notably rich in calcium and potassium compared with other pulse-growing regions of India. Farmers here know the crop by many names: redgram, Gulyal, Chaple, Bennur local.

Tur has been grown on this land for centuries — local growers trace it back to the 15th century. The seeds are round and well-filled, which is why the dal cooks quickly, keeps well, and carries an aroma that stands out in the pot. In 2019 that heritage was formally recognised with a Geographical Indication.

It is the dal of the Kannada thali — paired with jolada rotti, eaten with the fingers, eaten slowly.`,
  },
  'mokama-masoor': {
    region: 'Mokama Tal, Patna district, Bihar',
    ingredients: ['Mokama masoor — lentil (Lens culinaris)'],
  },
  'tandur-redgram': {
    region: 'Tandur, Vikarabad district, Telangana',
    ingredients: ['Tandur redgram — pigeon pea (Cajanus cajan)'],
  },

  // ============ TURMERIC ============
  'lakadong-turmeric': {
    region: 'Lakadong, West Jaintia Hills, Meghalaya',
    gi: { appNo: '741', year: '2023', number: '575th' },
    ingredients: ['Lakadong turmeric (Curcuma longa)'],
    originStory: `In the Jaintia Hills of Meghalaya, in a few villages around Lakadong, grows the turmeric that the world's pharmaceutical industry quietly considers the gold standard. With curcumin levels often crossing 7% — versus 2–3% in ordinary turmeric — this is the haldi that does the medicinal work the rest only promises.

Lakadong itself is a small village in the West Jaintia Hills district. The turmeric grows in hot, humid conditions under some of the heaviest rainfall anywhere — 4,000 to 7,000 mm a year. Farmers still grow it the traditional way, and it is that practice, together with the region's soil, that keeps its curcumin so consistently high from one harvest to the next.

You can see the difference before you taste it. Lakadong is darker than other Indian turmerics, a deep golden yellow, with an earthy, subtly nutty flavour and a high volatile-oil content that gives it its potency.

The Khasi and Jaintia farmers who grow it have known its potency for generations. A pinch in warm milk before sleep. A paste on a cut. A spoon in the family pot. Now, the GI tag is helping the world understand what the hills already knew.

Buy a small jar of Lakadong, and you will smell the difference the moment you open it — sharp, almost peppery, sun-warm. This is haldi the way it was meant to be.`,
  },
  'armoor-turmeric': {
    region: 'Armoor, Nizamabad district, Telangana',
    ingredients: ['Armoor turmeric (Curcuma longa)'],
  },
  'kandhamal-haladi': {
    region: 'Kandhamal district, Odisha',
    gi: { appNo: '610', year: '2019', number: '344th' },
    ingredients: ['Kandhamal haladi — turmeric (Curcuma longa)'],
    originStory: `In the Kandhamal hills of Odisha, the Kondh tribal community has been growing turmeric for centuries without a single drop of fertiliser. It is rain-fed, forest-shaded, and harvested with hand tools.

Kandhamal is a hilly tribal district in the heart of Odisha, and its climate does most of the work. From sowing to harvest the crop needs very little human interference — which is why the turmeric here is often described as organic by default, grown with traditional methods rather than fertilisers or pesticides.

The haldi has a strong, pungent aroma and a rich oil content, so a little goes a long way in colouring a dish — and it holds its character well on the shelf.

The colour is a deeper, more amber orange. The aroma is wilder. The story is that of an indigenous community that the GI tag finally credited.`,
  },

  // ============ CHILLI ============
  'kashmiri-long-chilli': {
    region: 'Kashmir Valley, Jammu & Kashmir',
    ingredients: ['Kashmiri long chilli, dried (Capsicum annuum)'],
  },
  'nandurbar-mirchi': {
    region: 'Nandurbar district (Khandesh), Maharashtra',
    ingredients: ['Nandurbar chilli, dried (Capsicum annuum)'],
  },

  // ============ OTHER SPICES ============
  'kashmir-saffron': {
    region: 'Pampore karewas, Pulwama district, Kashmir',
    gi: { appNo: '635', year: '2020', number: '366th' },
    ingredients: ['Kashmir saffron — dried stigmas of Crocus sativus'],
    originStory: `On a few autumn mornings in Pampore, just outside Srinagar, the fields turn violet. The Crocus sativus blooms — small, delicate, lasting only hours — and entire families step out at sunrise to pluck them before the sun ruins the stigma.

It takes nearly 1,50,000 flowers to make a single kilogram of Kashmir saffron. The threads are longer, darker, more pungent than any saffron grown elsewhere — Iranian, Spanish, none compare on the chemistry.

Kashmir saffron grows on the karewas — the raised plateaus of the valley floor — at 1,600 to 1,800 metres above sea level. Most of the world's saffron is grown far lower, typically between 600 and 1,000 metres. That altitude, together with the karewa soil, is what gives the threads their length, thickness and depth.

Saffron's quality is read in three compounds: crocin, which gives the natural deep red; safranal, which carries the aroma; and picrocrocin, which gives its characteristic bitterness. Kashmir threads are rich in all three — and they are still processed entirely by hand, without chemicals.

The GI tag, awarded in 2020, protects something Mughal emperors prized in their kitchens and apothecaries five centuries ago. To use Kashmir saffron is to taste history.`,
  },
  'arunachal-bebo': {
    region: 'Arunachal Pradesh',
    ingredients: ['Large cardamom pods (Amomum subulatum)'],
  },
  'himachali-kala-zeera': {
    region: 'Kinnaur, Lahaul-Spiti & Pangi, Himachal Pradesh',
    gi: { appNo: '432', year: '2019', number: '336th' },
    ingredients: ['Himachali kala zeera — black cumin seeds (Bunium persicum)'],
    originStory: `Kala zeera grows wild on the upper reaches of the Himachal mountains. It cannot be commercially farmed easily — only carefully hand-collected by villagers during a short window each year.

Its home is the high, pristine valleys of Kinnaur, Lahaul-Spiti and Pangi. For centuries the farming communities here have wild-harvested the small, crescent-shaped seeds from the forest slopes — knowledge of where, when and how to gather them that has been handed down through generations, and that has made kala zeera a fixture of festive mountain cooking.

Set it beside ordinary cumin and the difference is plain: the seeds are darker, thinner and smaller. The flavour is deeper and more complex — earthy, nutty — and the essential oils are so concentrated that a single pinch releases a rich, intense fragrance.

In a Kashmiri pulao, a Himachali madra, or a sprinkle on dahi — kala zeera transforms the dish with one spoon. The flavour is sweeter, more floral than ordinary cumin, with a smoky undertone.`,
  },
  'kanniyakumari-clove': {
    region: 'Kanniyakumari district, Tamil Nadu',
    gi: { appNo: '675', year: '2020', number: '406th' },
    ingredients: ['Kanniyakumari clove — dried flower buds (Syzygium aromaticum)'],
    originStory: `Where the three seas meet, the Western Ghats taper into a final flourish of clove plantations. Kanniyakumari cloves are plumper than typical, with oil so high they release fragrance the moment you crush one.

The trees grow in the hilly, densely wooded parts of the district, 400 to 900 metres above sea level, in black soil rich in organic matter. What reaches your kitchen is the aromatic flower bud — picked unopened, then dried.

The story here goes back more than two centuries. Kanniyakumari clove descends from the first cloves introduced to India by the East India Company in the early 1800s, planted at its spice garden in Courtallam, Tamil Nadu. Today the district's buds are prized for their high essential-oil content, characteristic aroma and rich flavour — valued in the kitchen and in traditional medicine alike.

A single clove from here can perfume a pot of biryani. Use it well — it is concentrated tropical heritage.`,
  },
  'kasti-coriander': {
    region: 'Maharashtra',
    ingredients: ['Kasti coriander seeds (Coriandrum sativum)'],
  },
  'kolli-hills-pepper': {
    region: 'Kolli Hills, Namakkal district, Tamil Nadu',
    ingredients: ['Kolli Hills black pepper (Piper nigrum)'],
  },
  'pollachi-nutmeg': {
    region: 'Pollachi & Anaimalai, Coimbatore district, Tamil Nadu',
    ingredients: ['Pollachi nutmeg (Myristica fragrans)'],
  },
  'rajasthan-jeera': {
    region: 'Rajasthan',
    ingredients: ['Cumin seeds (Cuminum cyminum)'],
  },
  'rani-pepper': {
    region: 'Karnataka',
    ingredients: ['Black pepper (Piper nigrum)'],
  },
  'sikkim-large-cardamom': {
    region: 'Sikkim',
    gi: { appNo: '376', year: '2015' },
    ingredients: ['Sikkim large cardamom pods (Amomum subulatum)'],
    originStory: `Sikkim is the largest producer of large cardamom in India, and the variety grown here is considered the world's finest. The pods are cured over wood smoke, giving them their distinctive deep-brown skin and a flavour that is simultaneously smoky, resinous, and slightly minty.

Large cardamom — badi elaichi — is native to the Sikkim Himalaya and has been grown here since ancient times, much of it organically, under the shade of forest trees. Generations of farming knowledge have shaped it into the variety the world now seeks out.

The curing is the craft. Farmers dry the pods in a traditional kiln called a bhatti, built so the heat can be controlled and every pod dries evenly. The finished pods range from deep purple to black, are larger than ordinary cardamom, and are rich in essential oil — which is why a single pod can scent an entire pot of curry, soup or slow-cooked meat.

This is the spice that lifts a dal makhani, a slow nihari, a Himalayan thukpa.`,
  },

  // ============ NUTS & DRY FRUITS ============
  'goa-cashew': {
    region: 'Goa (Konkan coast)',
    ingredients: ['Goa cashew kernels (Anacardium occidentale)'],
    allergens: 'Contains tree nuts (cashew).',
  },
  'jammu-kashmir-walnut': {
    region: 'Kashmir Valley, Jammu & Kashmir',
    ingredients: ['Kashmir walnuts (Juglans regia)'],
    allergens: 'Contains tree nuts (walnut).',
  },
  'ladakh-apricot': {
    region: 'Ladakh',
    ingredients: ['Sun-dried Ladakh apricots (Prunus armeniaca)', 'Apricot nuts (kernels)'],
  },
  'sangli-raisins': {
    region: 'Sangli district, Maharashtra',
    gi: { appNo: '490', year: '2016', number: '263rd' },
    ingredients: ['Sangli raisins — dried Thompson Seedless grapes (Vitis vinifera)'],
    originStory: `Sangli is to raisins what Nashik is to grapes. Almost 80% of India's raisins come from this district — and the Thompson Seedless variety, dried in airy open-sided sheds, is plumper and sweeter than anything imported.

Western Maharashtra gives the vines what they need: good monsoon rains, fertile soil rich in phosphate and potassium, and a mild climate. The grapes ripen pulpy and sweet, and the raisins they become have noticeably thinner skins than those grown elsewhere in India.

The Sangli secret is drying in the shade rather than under direct sun. It keeps the colour an even golden hue, stops the raisins from turning sticky, and helps them keep longer. Uniform, round and golden, they are the raisins that make a festive dry-fruit platter look its best.

Sangli farmers have been refining the art of raisin-making for four generations.`,
  },
  'kachchhi-kharek': {
    region: 'Kutch (Kachchh) district, Gujarat',
    ingredients: ['Kachchhi kharek — semi-dried dates (Phoenix dactylifera)'],
  },
  'kishtwar-chilgoga': {
    region: 'Kishtwar, Jammu & Kashmir',
    ingredients: ['Chilgoza pine nuts (Pinus gerardiana)'],
    allergens: 'Contains pine nuts.',
  },
  'kishtwar-hazlenuts': {
    region: 'Kishtwar, Jammu & Kashmir',
    ingredients: ['Kishtwar hazelnuts (Corylus)'],
    allergens: 'Contains tree nuts (hazelnut).',
  },
  'pangi-ki-thangi': {
    region: 'Pangi Valley, Chamba district, Himachal Pradesh',
    ingredients: ['Pangi ki thangi — wild Himalayan nuts'],
    allergens: 'Contains tree nuts.',
  },

  // ============ COCONUT ============
  'pollachi-tall-coconut': {
    region: 'Pollachi, Coimbatore district, Tamil Nadu',
    ingredients: ['Pollachi tall coconut copra — dried coconut kernel (Cocos nucifera)'],
  },

  // ============ OILSEEDS ============
  'jagtial-sesame': {
    region: 'Jagtial district, Telangana',
    ingredients: ['Jagtial white sesame seeds (Sesamum indicum)'],
    allergens: 'Contains sesame.',
  },
  'onattukara-ellu': {
    region: 'Onattukara (Alappuzha & Kollam), Kerala',
    ingredients: ['Onattukara ellu — sesame seeds (Sesamum indicum)'],
    allergens: 'Contains sesame.',
  },
  'ananthapuramu-groundnuts': {
    region: 'Anantapur (Ananthapuramu) district, Andhra Pradesh',
    ingredients: ['Ananthapuramu groundnuts (Arachis hypogaea)'],
    allergens: 'Contains peanuts.',
  },

  // ============ COFFEE & TEA ============
  'araku-valley-coffee': {
    region: 'Araku Valley, Eastern Ghats — Andhra Pradesh & Odisha',
    ingredients: ['Araku Valley Arabica coffee (Coffea arabica)'],
  },
  'chikmagalur-coffee': {
    region: 'Chikkamagaluru district, Karnataka',
    ingredients: ['Chikmagalur Arabica coffee (Coffea arabica)'],
  },
  'coorg-coffee': {
    region: 'Kodagu (Coorg) district, Karnataka',
    ingredients: ['Coorg Arabica coffee (Coffea arabica)'],
  },
  'himalayan-nettle-tea': {
    region: 'Uttarakhand Himalaya',
    ingredients: ['Dried wild Himalayan nettle leaves — kandali (Urtica dioica)'],
  },

  // ============ MAKHANA ============
  'mithila-makhana': {
    region: 'Mithilanchal region, Bihar',
    gi: { appNo: '696', year: '2022', number: '421st' },
    ingredients: ['Mithila makhana — popped fox nut seeds (Euryale ferox)'],
    originStory: `In the ponds of Mithila — Darbhanga, Madhubani — farmers wade waist-deep into water in summer to harvest the prickly seeds of the foxnut lotus. Each seed is then sun-dried, roasted on hot sand, and popped by hand.

Growing, harvesting and processing makhana is traditional knowledge that belongs to the fishing communities of Mithilanchal, gathered over generations. The plants thrive best in old, perennial ponds whose rich, mucky beds feed them nutrients through the season.

A single farmer might pop only a few kilograms in a day. Mithila Makhana, GI-tagged in 2022, is one of the few foods in the world still made entirely by hand, in water, in the open sun.

Light, crunchy, with a flavour that asks for nothing but a touch of ghee and pink salt — it is the rare snack that is also a centuries-old craft.`,
  },

  // ============ MEDICINAL & HERBAL ============
  'ladakh-seabuckthorn': {
    region: 'Ladakh',
    gi: { appNo: '727', year: '2023', number: '484th' },
    ingredients: ['Ladakh seabuckthorn berry pulp (Hippophae rhamnoides)'],
    originStory: `Seabuckthorn grows wild along the Indus and Nubra rivers in Ladakh, at altitudes where almost nothing else fruits. The orange berries are so dense in Vitamin C, omega oils, and antioxidants that the Indian Army has long included them in soldiers' supplements at high altitude.

The shrub survives temperatures from –43°C to +40°C, and the fruit is as resilient as the plant. The berries carry hundreds of bioactive compounds, free amino acids, vitamins C and E, and all four omega fatty acids — 3, 6, 7 and 9.

Harvest runs from August to mid-September, beginning at six in the morning. The plants are wild and fiercely thorny, so picking is slow and painstaking. And because the berries spoil quickly, they have to be processed within about eight hours — village teams often work from afternoon through the night to finish the day's harvest.

A tonic, a tea, a juice — Ladakhi seabuckthorn is a piece of high-desert resilience you can drink.`,
  },
  'nagori-ashwagandha': {
    region: 'Nagaur district, Rajasthan',
    gi: { appNo: '1143', year: '2025', number: '709th' },
    extraInfo: [['Caution', 'Not recommended during pregnancy or breastfeeding. Consult your doctor if you are on medication.']],
    ingredients: ['Nagori ashwagandha root (Withania somnifera)'],
    originStory: `In the arid plains around Nagaur, the wild horse-smelling root that Ayurveda calls ashwagandha grows in its most potent form. The desert stress makes the plant pour its energy into the root — and that root, dried and powdered, is what Ayurvedic doctors across India still prefer.

The name says it all. Ashwagandha means "smell of the horse" — ashwa, horse; gandha, smell. The fresh root carries that scent, and tradition holds that it lends the one who takes it a horse's strength and vitality. It is described in the great classical texts of Ayurveda — the Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya and Bhava Prakash Nighantu.

Nagaur is a land of extremes: scorching summers, freezing winters, mineral-rich sandy soil and late winter rains. Under that pressure the plant builds a superior root — dense, potent and brittle enough to snap — which is why Nagori roots have long been valued above those grown elsewhere.

A spoon in warm milk before sleep. An age-old answer to stress.`,
  },

  // ============ ONION, GARLIC & ROOTS ============
  'himalayan-snow-garlic': {
    region: 'Himalayan region, Jammu & Kashmir',
    ingredients: ['Single-clove Himalayan snow mountain garlic (Allium sativum)'],
  },
  'lasalgaon-onion': {
    region: 'Lasalgaon, Nashik district, Maharashtra',
    ingredients: ['Lasalgaon onions (Allium cepa)'],
  },
  'karbi-anglong-ginger': {
    region: 'Karbi Anglong district, Assam',
    gi: { appNo: '435', year: '2015', number: '226th' },
    ingredients: ['Karbi Anglong ginger (Zingiber officinale)'],
    originStory: `In the hills of Karbi Anglong, the Karbi tribal community has been growing this distinctive ginger for centuries. Larger, less fibrous, and higher in essential oil than ordinary ginger, it is the gold standard for both cooking and pharma extraction.

Karbi Anglong is a hilly tribal district of Assam, and its well-drained soils and climate have produced some of India's finest ginger for as long as anyone remembers. Much of it is grown in the Singhasan Hills around Khonbamon, largely by tribal farmers working the traditional way.

Two local varieties carry the name: Nadia, which is more fibrous, and Aizol, which has little or no fibre. Both are known for a distinct flavour, high pungency and a rich gingerol content — the compound behind ginger's heat.

Grate it into tea, pound it into a masala, or slip a sliver into a winter broth — a little is enough to carry the dish.`,
  },
  'baruasagar-adrak': {
    region: 'Baruasagar, Jhansi district, Uttar Pradesh',
    ingredients: ['Baruasagar ginger (Zingiber officinale)'],
  },
  'chettikulam-small-onion': {
    region: 'Chettikulam, Perambalur district, Tamil Nadu',
    ingredients: ['Chettikulam small onions — shallots (Allium cepa var. aggregatum)'],
  },
  'farrukhabad-fulwa-aloo': {
    region: 'Farrukhabad district, Uttar Pradesh',
    ingredients: ['Farrukhabad fulwa potatoes (Solanum tuberosum)'],
  },
  'sikar-pyaj': {
    region: 'Sikar district (Shekhawati), Rajasthan',
    ingredients: ['Sikar red onions (Allium cepa)'],
  },

  // ============ PROCESSED / OTHER ============
  'assam-supari': {
    region: 'Assam',
    ingredients: ['Assam supari — areca nut (Areca catechu)'],
  },
  'bastar-tamarind': {
    region: 'Bastar, Chhattisgarh',
    ingredients: ['Bastar tamarind (Tamarindus indica)'],
  },
  'madanapalle-tamarind': {
    region: 'Madanapalle, Andhra Pradesh',
    ingredients: ['Madanapalle tamarind (Tamarindus indica)'],
  },
  'sindhudurg-ratnagiri-kokum': {
    region: 'Sindhudurg & Ratnagiri districts (Konkan coast), Maharashtra',
    ingredients: ['Sun-dried kokum rind (Garcinia indica)'],
  },
  'sirsi-supari': {
    region: 'Sirsi, Uttara Kannada district, Karnataka',
    gi: { appNo: '464', year: '2019', number: '337th' },
    ingredients: ['Sirsi supari — areca nut (Areca catechu)'],
    originStory: `Sirsi, in Karnataka's Uttara Kannada district, has cultivated betel nut for centuries on terraced plantations. The local processing — boiled, dried, polished — gives Sirsi supari its distinctive smooth finish and flavour, recognised by a GI tag.

The town sits in the Western Ghats, and arecanut has been grown here since the Vedic period. The region's climate and terrain give its nuts a character of their own.

Old texts remember these groves. In Kalidasa's Raghuvamsha, Rama describes to Sita the richly laid-out, heavily bearing areca plantations of India's west coast. Sacred as well as everyday, the areca palm is known as Brahmavriksha, and the nut is still offered as dakshina at pujas.

It is a crop of patience. A palm takes eight to ten years to begin bearing, reaches its full crop at around fifteen, and then keeps giving for three decades.`,
  },
  'badri-cow-ghee': {
    region: 'Uttarakhand hills',
    ingredients: ['Ghee made from the milk of indigenous Badri cows'],
    allergens: 'Contains milk.',
  },
};

// Build the three tab payloads for a product.
function getProductDetails(product) {
  const d = PRODUCT_DETAILS[product.id] || {};

  const giYearFromFacts = (product.keyFacts || [])
    .map(f => (f.match(/GI Tag:\s*(\d{4})/i) || [])[1])
    .find(Boolean);
  const gi = d.gi || {};
  const giYear = gi.year || giYearFromFacts;

  const additionalInfo = [
    ['Country of Origin', 'India'],
    ['Geographical Region', d.region || [product.region, product.state].filter(Boolean).join(', ')],
    gi.appNo && ['GI Application No.', gi.appNo],
    giYear && ['GI Status Awarded', giYear],
    gi.number && ['GI Product of India', gi.number],
    ...(d.extraInfo || []),
  ].filter(Boolean);

  return {
    originStory: d.originStory || product.story || '',
    additionalInfo,
    ingredients: d.ingredients || [],
    allergens: d.allergens || '',
  };
}
