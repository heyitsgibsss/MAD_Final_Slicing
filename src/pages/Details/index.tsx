import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';
import {getDatabase, ref, set, remove, onValue} from 'firebase/database';
import {getAuth} from 'firebase/auth';

const recipeData = {
  'chocolate-lava-cake': {
    recipeId: 'chocolate-lava-cake',
    recipeName: 'Chocolate Lava Cake',
    image: 'chocolatelavacake.jpeg',
    description: 'Kue cokelat lembut dengan isian lumer yang menghibur hati',
    ingredients:
      '100g dark chocolate\n100g mentega\n2 butir telur\n50g gula\n30g tepung terigu',
    instructions:
      '1. Lelehkan cokelat dan mentega bersama-sama.\n2. Kocok telur dan gula hingga mengembang.\n3. Campurkan lelehan cokelat dan kocokan telur.\n4. Tambahkan tepung, aduk rata.\n5. Tuang ke dalam cetakan, panggang 8–10 menit.',
  },
  'rainbow-smoothies': {
    recipeId: 'rainbow-smoothies',
    recipeName: 'Rainbow Smoothies',
    image: 'rainbowsmoothies.jpeg',
    description: 'Minuman warna-warni yang penuh dengan buah segar',
    ingredients:
      '1 pisang\n100g stroberi\n100g mangga\n100ml yogurt\n50ml susu',
    instructions:
      '1. Blender pisang dan susu hingga halus.\n2. Tambahkan stroberi, blender lagi.\n3. Tambahkan mangga dan yogurt, blender hingga rata.\n4. Tuang ke gelas, sajikan dingin.',
  },
  pastabake: {
    recipeId: 'pastabake',
    recipeName: 'Pasta Bake',
    image: 'pastabake.jpeg',
    description: 'Pasta panggang dengan keju meleleh yang nyaman',
    ingredients:
      '200g pasta\n100g keju cheddar\n50g saus tomat\n1 bawang\n50g daging',
    instructions:
      '1. Rebus pasta hingga al dente.\n2. Tumis bawang dan daging.\n3. Campur pasta, saus tomat, dan tumisan.\n4. Taburi keju, panggang 20 menit.',
  },
  'fruit-pancake': {
    recipeId: 'fruit-pancake',
    recipeName: 'Fruit Pancake',
    image: 'fruitpancake.jpeg',
    description: 'Pancake lembut dengan topping buah segar',
    ingredients: '100g tepung\n1 telur\n100ml susu\n50g stroberi\n1 pisang',
    instructions:
      '1. Campur tepung, telur, dan susu.\n2. Panaskan wajan, tuang adonan.\n3. Masak hingga kecokelatan.\n4. Hias dengan stroberi dan pisang.',
  },
  'chicken-soup': {
    recipeId: 'chicken-soup',
    recipeName: 'Chicken Soup',
    image: 'chickensoup.jpeg',
    description: 'Sup ayam hangat yang menenangkan jiwa',
    ingredients: '200g ayam\n1 wortel\n1 kentang\n1 bawang\n500ml kaldu',
    instructions:
      '1. Rebus ayam dengan kaldu.\n2. Tambahkan wortel, kentang, bawang.\n3. Masak hingga sayuran lunak.\n4. Sajikan hangat.',
  },
  'mashed-potato': {
    recipeId: 'mashed-potato',
    recipeName: 'Mashed Potato',
    image: 'mashedpotato.jpeg',
    description: 'Kentang tumbuk creamy yang menghibur',
    ingredients: '300g kentang\n50ml susu\n30g mentega\nGaram\nLada',
    instructions:
      '1. Rebus kentang hingga lunak.\n2. Tumbuk dengan susu dan mentega.\n3. Tambahkan garam dan lada.\n4. Sajikan hangat.',
  },
  'hot-choco': {
    recipeId: 'hot-choco',
    recipeName: 'Hot Chocolate',
    image: 'hotchoco.jpeg',
    description: 'Cokelat panas yang menghangatkan hati',
    ingredients: '200ml susu\n50g cokelat\n1 sdm gula\nKrim kocok',
    instructions:
      '1. Panaskan susu.\n2. Lelehkan cokelat dalam susu.\n3. Tambahkan gula, aduk.\n4. Hias dengan krim kocok.',
  },
  'mushroom-risotto': {
    recipeId: 'mushroom-risotto',
    recipeName: 'Mushroom Risotto',
    image: 'mushroomrisotto.jpeg',
    description: 'Risotto jamur yang kaya dan lembut',
    ingredients:
      '100g beras arborio\n50g jamur\n1 bawang\n200ml kaldu\n30g keju',
    instructions:
      '1. Tumis bawang dan jamur.\n2. Tambahkan beras, aduk.\n3. Tuang kaldu sedikit demi sedikit.\n4. Taburi keju sebelum disajikan.',
  },
  'green-tea': {
    recipeId: 'green-tea',
    recipeName: 'Green Tea',
    image: 'greentea.jpeg',
    description: 'Teh hijau segar yang menyegarkan',
    ingredients: '1 sdt teh hijau\n200ml air panas\n1 sdt madu',
    instructions:
      '1. Seduh teh hijau dengan air panas.\n2. Diamkan 2 menit.\n3. Tambahkan madu, aduk.\n4. Sajikan hangat.',
  },
  'avocado-toast': {
    recipeId: 'avocado-toast',
    recipeName: 'Avocado Toast',
    image: 'avocadotoast.jpeg',
    description: 'Roti panggang dengan alpukat yang penuh energi',
    ingredients: '1 alpukat\n2 iris roti\n1 sdt lemon\nGaram\nLada',
    instructions:
      '1. Panggang roti.\n2. Hancurkan alpukat, tambahkan lemon.\n3. Oleskan ke roti.\n4. Taburi garam dan lada.',
  },
  oatmeal: {
    recipeId: 'oatmeal',
    recipeName: 'Oatmeal',
    image: 'oatmeal.jpeg',
    description: 'Oatmeal hangat dengan topping buah',
    ingredients: '50g oat\n200ml susu\n1 pisang\n10g kacang',
    instructions:
      '1. Masak oat dengan susu.\n2. Aduk hingga mengental.\n3. Tambahkan pisang dan kacang.\n4. Sajikan hangat.',
  },
  'lavender-honey-milk': {
    recipeId: 'lavender-honey-milk',
    recipeName: 'Lavender Honey Milk',
    image: 'lavenderhoneymilk.jpeg',
    description: 'Susu lavender madu yang menenangkan',
    ingredients: '200ml susu\n1 sdt lavender\n1 sdm madu',
    instructions:
      '1. Panaskan susu dengan lavender.\n2. Saring, tambahkan madu.\n3. Aduk rata.\n4. Sajikan hangat.',
  },
  'spring-rolls': {
    recipeId: 'spring-rolls',
    recipeName: 'Spring Rolls',
    image: 'springrolls.jpeg',
    description: 'Lumpia segar dengan sayuran renyah',
    ingredients: '10 kulit lumpia\n100g kol\n50g wortel\n1 sdm saus',
    instructions:
      '1. Iris kol dan wortel.\n2. Isi kulit lumpia.\n3. Gulung, sajikan dengan saus.\n4. Nikmati segar.',
  },
  pizza: {
    recipeId: 'pizza',
    recipeName: 'Pizza',
    image: 'pizza.jpeg',
    description: 'Pizza homemade dengan topping favorit',
    ingredients: '200g tepung\n100ml air\n50g keju\n50g saus tomat\nTopping',
    instructions:
      '1. Buat adonan dengan tepung dan air.\n2. Oles saus tomat.\n3. Tambahkan keju dan topping.\n4. Panggang 15 menit.',
  },
  'fruit-skewers': {
    recipeId: 'fruit-skewers',
    recipeName: 'Fruit Skewers',
    image: 'fruitskewers.jpeg',
    description: 'Sate buah segar yang ceria',
    ingredients: '100g anggur\n100g stroberi\n100g melon\nTusuk sate',
    instructions:
      '1. Potong buah.\n2. Tusuk secara bergantian.\n3. Susun rapi.\n4. Sajikan dingin.',
  },
  'sushi-burrito': {
    recipeId: 'sushi-burrito',
    recipeName: 'Sushi Burrito',
    image: 'sushiburito.jpeg',
    description: 'Sushi besar dengan isian lezat',
    ingredients: '100g nasi sushi\n50g salmon\n1 alpukat\nNori',
    instructions:
      '1. Ratakan nasi di nori.\n2. Tambahkan salmon dan alpukat.\n3. Gulung seperti burrito.\n4. Potong dan sajikan.',
  },
  ramen: {
    recipeId: 'ramen',
    recipeName: 'Ramen',
    image: 'ramen.jpeg',
    description: 'Ramen hangat dengan kuah gurih',
    ingredients: '100g mie ramen\n200ml kaldu\n50g ayam\n1 telur\nNori',
    instructions:
      '1. Rebus mie.\n2. Panaskan kaldu, tambahkan ayam.\n3. Tambahkan telur dan nori.\n4. Sajikan panas.',
  },
  'hot-wings': {
    recipeId: 'hot-wings',
    recipeName: 'Hot Wings',
    image: 'hotwings.jpeg',
    description: 'Sayap ayam pedas yang menggugah selera',
    ingredients: '200g sayap ayam\n50g saus pedas\n30g mentega\nGaram',
    instructions:
      '1. Panggang sayap ayam.\n2. Campur saus pedas dan mentega.\n3. Lumuri sayap.\n4. Sajikan panas.',
  },
  'volcano-drink': {
    recipeId: 'volcano-drink',
    recipeName: 'Volcano Drink',
    image: 'volcanodrink.jpeg',
    description: 'Minuman menyala dengan cita rasa eksotis',
    ingredients: '100ml jus jeruk\n50ml soda\n1 sdm sirup\nEs batu',
    instructions:
      '1. Campur jus dan sirup.\n2. Tambahkan es batu.\n3. Tuang soda.\n4. Sajikan dingin.',
  },
  'hellfire-noodles': {
    recipeId: 'hellfire-noodles',
    recipeName: 'Hellfire Noodles',
    image: 'hellfirenoodles.jpeg',
    description: 'Mie pedas yang membakar lidah dengan cita rasa kuat',
    ingredients:
      '200g mie telur\n50g cabai rawit\n2 sdm saus sambal\n1 sdm kecap\n100g ayam',
    instructions:
      '1. Rebus mie hingga al dente.\n2. Tumis cabai dan ayam.\n3. Tambahkan saus sambal dan kecap.\n4. Campur mie, aduk rata.\n5. Sajikan panas.',
  },
};

// Image mapping for local assets
const imageMap = {
  'chocolatelavacake.jpeg': require('../../assets/recipes/chocolatelavacake.jpeg'),
  'rainbowsmoothies.jpeg': require('../../assets/recipes/rainbowsmoothies.jpeg'),
  'pastabake.jpeg': require('../../assets/recipes/pastabake.jpeg'),
  'fruitpancake.jpeg': require('../../assets/recipes/fruitpancake.jpeg'),
  'chickensoup.jpeg': require('../../assets/recipes/chickensoup.jpeg'),
  'mashedpotato.jpeg': require('../../assets/recipes/mashedpotato.jpeg'),
  'hotchoco.jpeg': require('../../assets/recipes/hotchoco.jpeg'),
  'mushroomrisotto.jpeg': require('../../assets/recipes/mushroomrisotto.jpeg'),
  'greentea.jpeg': require('../../assets/recipes/greentea.jpeg'),
  'avocadotoast.jpeg': require('../../assets/recipes/avocadotoast.jpeg'),
  'oatmeal.jpeg': require('../../assets/recipes/oatmeal.jpeg'),
  'lavenderhoneymilk.jpeg': require('../../assets/recipes/lavenderhoneymilk.jpeg'),
  'springrolls.jpeg': require('../../assets/recipes/springrolls.jpeg'),
  'pizza.jpeg': require('../../assets/recipes/pizza.jpeg'),
  'fruitskewers.jpeg': require('../../assets/recipes/fruitskewers.jpeg'),
  'sushiburito.jpeg': require('../../assets/recipes/sushiburito.jpeg'),
  'ramen.jpeg': require('../../assets/recipes/ramen.jpeg'),
  'hotwings.jpeg': require('../../assets/recipes/hotwings.jpeg'),
  'volcanodrink.jpeg': require('../../assets/recipes/volcanodrink.jpeg'),
  'hellfirenoodles.jpeg': require('../../assets/recipes/hellfirenoodles.jpeg'),
};

const Details = ({route}) => {
  const {recipeId} = route.params || {};
  const recipe = recipeData[recipeId] || {
    recipeId: 'unknown',
    recipeName: 'Unknown Recipe',
    image: 'sushi.png',
    description: 'No description available.',
    ingredients: 'No ingredients available.',
    instructions: 'No instructions available.',
  };

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (!currentUser || !recipeId) return;

    const db = getDatabase();
    const favoriteRef = ref(
      db,
      `users/${currentUser.uid}/favorites/${recipeId}`,
    );

    const unsubscribe = onValue(
      favoriteRef,
      snapshot => {
        setIsBookmarked(snapshot.exists());
      },
      error => {
        console.error('Error checking favorite status:', error);
      },
    );

    return () => unsubscribe();
  }, [currentUser, recipeId]);

  const toggleBookmark = () => {
    if (!currentUser) {
      console.log('User not logged in');
      return;
    }

    const db = getDatabase();
    const favoriteRef = ref(
      db,
      `users/${currentUser.uid}/favorites/${recipeId}`,
    );

    if (isBookmarked) {
      remove(favoriteRef)
        .then(() => {
          console.log('Recipe removed from favorites');
          setIsBookmarked(false);
        })
        .catch(error => {
          console.error('Error removing from favorites:', error);
        });
    } else {
      set(favoriteRef, {
        recipeName: recipe.recipeName,
        image: recipe.image,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        timestamp: new Date().toISOString(),
      })
        .then(() => {
          console.log('Recipe saved to favorites');
          setIsBookmarked(true);
        })
        .catch(error => {
          console.error('Error saving to favorites:', error);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.card}>
        <Image
          source={
            imageMap[recipe.image] || require('../../assets/sushi.png')
          }
          style={styles.recipeImage}
        />

        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>{recipe.recipeName}</Text>
          <Text style={styles.recipeSubtitle}>{recipe.description}</Text>

          <TouchableOpacity
            style={styles.bookmarkIcon}
            onPress={toggleBookmark}>
            <Image
              source={
                isBookmarked
                  ? require('../../assets/bookmarkclose.png')
                  : require('../../assets/bookmark.png')
              }
              style={styles.bookmarkImage}
            />
          </TouchableOpacity>

          <View style={styles.recipeDetails}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            <Text style={styles.recipeText}>{recipe.ingredients}</Text>

            <Text style={styles.sectionTitle}>Instructions:</Text>
            <Text style={styles.recipeText}>{recipe.instructions}</Text>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  recipeImage: {
    width: '100%',
    height: 330,
  },
  recipeContent: {
    padding: 15,
    position: 'relative',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  recipeSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  bookmarkImage: {
    width: 24,
    height: 24,
  },
  recipeDetails: {
    backgroundColor: '#F4C149',
    padding: 10,
    borderRadius: 15,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
    marginInlineStart: 10,
    marginInlineEnd: 10,
  },
  recipeText: {
    color: '#333',
    fontSize: 18,
    lineHeight: 20,
    marginInlineStart: 20,
    marginInlineEnd: 20,
    marginBlockStart: 5,
    marginBlockEnd: 5,
  },
});
