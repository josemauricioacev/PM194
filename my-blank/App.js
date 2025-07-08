import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { label: 'Ficción', value: 'fiction' },
  { label: 'Historia', value: 'history' },
  { label: 'Tecnología', value: 'technology' },
];

const App = () => {
  const [books, setBooks] = useState([]);
  const [allBooksData, setAllBooksData] = useState([]); // Para guardar todos los libros
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('fiction');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showAuthors, setShowAuthors] = useState(false);
  const [authorFilter, setAuthorFilter] = useState('');

  const fetchBooks = async (category) => {
    setLoading(true);
    try {
      // Múltiples consultas para obtener más libros
      const queries = [
        `subject:${category}`,
        `intitle:${category}`,
        `${category}+fiction`,
        `${category}+books`,
        `${category}+literature`
      ];

      let allBooks = [];
      
      for (const query of queries) {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&orderBy=relevance`
          );
          
          if (response.ok) {
            const data = await response.json();
            if (data.items && data.items.length > 0) {
              allBooks = [...allBooks, ...data.items];
              if (allBooks.length >= 100) break; // Obtener más libros
            }
          }
        } catch (error) {
          console.log(`Error en consulta ${query}:`, error);
        }
      }

      if (allBooks.length === 0) {
        Alert.alert('Sin resultados', 'No se encontraron libros para esta categoría');
        setBooks([]);
        setAllBooksData([]);
        return;
      }

      // Procesar y filtrar libros
      const processedBooks = allBooks
        .filter((item, index, self) => {
          const isUnique = self.findIndex(book => book.id === item.id) === index;
          return isUnique && 
                 item.volumeInfo?.authors && 
                 item.volumeInfo?.title &&
                 item.volumeInfo?.imageLinks?.thumbnail &&
                 item.volumeInfo.title.length > 0;
        })
        .map(item => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description 
            ? item.volumeInfo.description.replace(/<[^>]*>/g, '').substring(0, 300) + '...'
            : 'Descripción no disponible',
          publisher: item.volumeInfo.publisher || 'Editorial no especificada',
          thumbnail: item.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:'),
          publishedDate: item.volumeInfo.publishedDate,
          pageCount: item.volumeInfo.pageCount,
          language: item.volumeInfo.language || 'es',
          category: category,
        }));

      // Agrupar por autor y asegurar mínimo 3 libros por autor
      const groupedByAuthor = {};
      
      processedBooks.forEach(book => {
        const primaryAuthor = book.authors[0];
        if (!groupedByAuthor[primaryAuthor]) {
          groupedByAuthor[primaryAuthor] = [];
        }
        groupedByAuthor[primaryAuthor].push(book);
      });

      // Filtrar autores que tengan al menos 2 libros
      const filteredAuthors = Object.keys(groupedByAuthor).filter(
        author => groupedByAuthor[author].length >= 2
      );

      // Si no hay suficientes autores con múltiples libros, ajustar criterio
      const finalAuthors = filteredAuthors.length < 5 
        ? Object.keys(groupedByAuthor).slice(0, 10)
        : filteredAuthors.slice(0, 15);

      const sections = finalAuthors
        .sort()
        .map(author => ({
          title: author,
          data: groupedByAuthor[author].slice(0, 5), // Máximo 5 libros por autor
        }));

      setBooks(sections);
      setAllBooksData(processedBooks);
      console.log(`Libros cargados: ${processedBooks.length} en ${sections.length} autores`);
      
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudieron cargar los libros. Verifica tu conexión a internet.');
      setBooks([]);
      setAllBooksData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(selectedCategory);
  }, [selectedCategory]);

  const getBooksByAuthor = (authorName) => {
    return allBooksData.filter(book => 
      book.authors.some(author => author.toLowerCase().includes(authorName.toLowerCase()))
    );
  };

  const getFilteredAuthors = () => {
    const allAuthors = [...new Set(allBooksData.flatMap(book => book.authors))];
    return allAuthors
      .filter(author => 
        author.toLowerCase().includes(authorFilter.toLowerCase())
      )
      .sort()
      .slice(0, 20);
  };

  const renderBookItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.bookItem}
      onPress={() => setSelectedBook(item)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.bookImage}
        resizeMode="cover"
      />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
        <TouchableOpacity onPress={() => {
          setSelectedAuthor(item.authors[0]);
          setSelectedBook(null);
        }}>
          <Text style={styles.bookAuthor} numberOfLines={1}>
            Por: {item.authors[0]}
          </Text>
        </TouchableOpacity>
        <Text style={styles.bookPublisher} numberOfLines={1}>{item.publisher}</Text>
        {item.publishedDate && (
          <Text style={styles.bookDate}>
            {item.publishedDate.split('-')[0]}
          </Text>
        )}
        {item.pageCount && (
          <Text style={styles.bookPages}>{item.pageCount} páginas</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title, data } }) => (
    <TouchableOpacity 
      style={styles.sectionHeader}
      onPress={() => {
        setSelectedAuthor(title);
      }}
    >
      <Text style={styles.sectionHeaderText}>
        📚 {title} ({data.length} libro{data.length !== 1 ? 's' : ''})
      </Text>
      <Text style={styles.sectionHeaderSubtext}>Toca para ver todos sus libros</Text>
    </TouchableOpacity>
  );

  const renderCategoryButtons = () => (
    <View style={styles.categoryContainer}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity
          key={category.value}
          style={[
            styles.categoryButton,
            selectedCategory === category.value && styles.selectedCategoryButton
          ]}
          onPress={() => setSelectedCategory(category.value)}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.categoryButtonText,
            selectedCategory === category.value && styles.selectedCategoryButtonText
          ]}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBookDetail = () => (
    <ScrollView style={styles.detailContainer} showsVerticalScrollIndicator={false}>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => setSelectedBook(null)}
        activeOpacity={0.8}
      >
        <Text style={styles.closeButtonText}>✕ Cerrar</Text>
      </TouchableOpacity>
      
      <View style={styles.detailContent}>
        <Image 
          source={{ uri: selectedBook.thumbnail }} 
          style={styles.detailImage}
          resizeMode="cover"
        />
        <Text style={styles.detailTitle}>{selectedBook.title}</Text>
        <TouchableOpacity onPress={() => {
          setSelectedAuthor(selectedBook.authors[0]);
          setSelectedBook(null);
        }}>
          <Text style={styles.detailAuthorLink}>Por: {selectedBook.authors.join(', ')}</Text>
        </TouchableOpacity>
        <Text style={styles.detailPublisher}>Editorial: {selectedBook.publisher}</Text>
        
        {selectedBook.publishedDate && (
          <Text style={styles.detailDate}>Fecha: {selectedBook.publishedDate}</Text>
        )}
        
        {selectedBook.pageCount && (
          <Text style={styles.detailPages}>Páginas: {selectedBook.pageCount}</Text>
        )}
        
        <Text style={styles.detailDescriptionTitle}>Descripción:</Text>
        <Text style={styles.detailDescription}>{selectedBook.description}</Text>
      </View>
    </ScrollView>
  );

  const renderAuthorView = () => {
    const authorBooks = getBooksByAuthor(selectedAuthor);
    
    return (
      <View style={styles.container}>
        <View style={styles.authorHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setSelectedAuthor(null)}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.authorTitle}>Libros de {selectedAuthor}</Text>
          <Text style={styles.authorSubtitle}>{authorBooks.length} libros encontrados</Text>
        </View>
        
        <FlatList
          data={authorBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderAuthorsFilter = () => {
    const filteredAuthors = getFilteredAuthors();
    
    return (
      <View style={styles.container}>
        <View style={styles.filterHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setShowAuthors(false)}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
          <Text style={styles.filterTitle}>Buscar Autores</Text>
          
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar autor..."
            value={authorFilter}
            onChangeText={setAuthorFilter}
          />
        </View>
        
        <FlatList
          data={filteredAuthors}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.authorItem}
              onPress={() => {
                setSelectedAuthor(item);
                setShowAuthors(false);
              }}
            >
              <Text style={styles.authorItemText}>📚 {item}</Text>
              <Text style={styles.authorBookCount}>
                {getBooksByAuthor(item).length} libros
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const totalBooks = books.reduce((total, section) => total + section.data.length, 0);
  const totalAuthors = books.length;

  if (selectedBook) {
    return (
      <SafeAreaView style={styles.container}>
        {renderBookDetail()}
      </SafeAreaView>
    );
  }

  if (selectedAuthor) {
    return (
      <SafeAreaView style={styles.container}>
        {renderAuthorView()}
      </SafeAreaView>
    );
  }

  if (showAuthors) {
    return (
      <SafeAreaView style={styles.container}>
        {renderAuthorsFilter()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Biblioteca Digital</Text>
      
      {renderCategoryButtons()}
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.authorsButton}
          onPress={() => setShowAuthors(true)}
        >
          <Text style={styles.authorsButtonText}>👥 Ver Autores</Text>
        </TouchableOpacity>
      </View>
      
      {!loading && books.length > 0 && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {totalBooks} libros • {totalAuthors} autores
          </Text>
        </View>
      )}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Cargando libros...</Text>
        </View>
      ) : books.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay libros disponibles</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchBooks(selectedCategory)}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <SectionList
          sections={books}
          keyExtractor={(item) => item.id}
          renderItem={renderBookItem}
          renderSectionHeader={renderSectionHeader}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={true}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    minWidth: width * 0.25,
  },
  selectedCategoryButton: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  selectedCategoryButtonText: {
    color: '#fff',
  },
  actionButtons: {
    alignItems: 'center',
    marginBottom: 10,
  },
  authorsButton: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  authorsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  list: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  sectionHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionHeaderSubtext: {
    color: '#b3d9ff',
    fontSize: 12,
    marginTop: 2,
  },
  bookItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 5,
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookImage: {
    width: 60,
    height: 90,
    borderRadius: 5,
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 3,
    textDecorationLine: 'underline',
  },
  bookPublisher: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  bookDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  bookPages: {
    fontSize: 12,
    color: '#999',
  },
  authorHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  authorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  authorSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  filterHeader: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  authorItem: {
    backgroundColor: '#fff',
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  authorItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  authorBookCount: {
    fontSize: 12,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    margin: 15,
    padding: 10,
    backgroundColor: '#ff4444',
    borderRadius: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailContent: {
    padding: 20,
    alignItems: 'center',
  },
  detailImage: {
    width: 150,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  detailAuthorLink: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 5,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  detailPublisher: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailPages: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  detailDescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    alignSelf: 'flex-start',
  },
  detailDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
    textAlign: 'justify',
  },
});

export default App;