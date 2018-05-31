import React from 'react';
import PropTypes from 'prop-types';
import { Alert, FlatList, RefreshControl, Image } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import Loading from './Loading';
import Error from './Error';
import Spacer from './Spacer';

const RecipeListing = ({
  error,
  loading,
  products,
  reFetch,
  buyProduct,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => buyProduct(item).then(Alert.alert('Su compra se registro correctamente'));

  return (
    <Container>
      <Content padder>
        <FlatList
          numColumns={2}
          data={products}
          renderItem={({ item }) => (
            <Card transparent style={{ paddingHorizontal: 6 }}>
              <CardItem cardBody>
                <Image
                  source={{ uri: item.image }}
                  resizeMode="contain"
                  style={{
                    height: 100,
                    width: null,
                    flex: 1,
                    borderRadius: 5,
                  }}
                />
              </CardItem>
              <CardItem cardBody>
                <Body>
                  <Spacer size={10} />
                  <Text style={{ fontWeight: '800' }}>{item.name}</Text>
                  <Spacer size={15} />
                  <Button
                    block
                    bordered
                    small
                    onPress={() => onPress(item)}
                  >
                    <Text>Comprar ${item.price}</Text>
                  </Button>
                  <Spacer size={5} />
                </Body>
              </CardItem>
            </Card>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
  );
};

RecipeListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  reFetch: PropTypes.func,
  buyProduct: PropTypes.func,
};

RecipeListing.defaultProps = {
  error: null,
  reFetch: null,
  buyProduct: null,
};

export default RecipeListing;
