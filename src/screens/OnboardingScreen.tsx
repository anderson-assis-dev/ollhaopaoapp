import React, { useRef, useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from '../components/Button';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Nunca mais perca o pão quentinho',
    description: 'Receba notificações em tempo real quando sua fornada favorita estiver saindo do forno',
    icon: '🔥',
  },
  {
    id: '2',
    title: 'Ganhe cashback em cada compra',
    description: 'A cada compra você recebe dinheiro de volta para usar nas próximas vezes',
    icon: '💰',
  },
  {
    id: '3',
    title: 'Acumule pontos e troque por prêmios',
    description: 'Compre, acumule pontos e troque por produtos grátis e descontos exclusivos',
    icon: '🎁',
  },
];

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderItem = ({ item }: { item: typeof slides[0] }) => (
    <View style={{ width }} className="flex-1 items-center justify-center px-8">
      <View className="mb-12">
        <Text className="text-8xl text-center mb-8">{item.icon}</Text>
        <Text className="text-3xl font-bold text-center mb-4">
          {item.title}
        </Text>
        <Text className="text-lg text-gray-600 text-center leading-6">
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity onPress={handleSkip} activeOpacity={0.7}>
          <Text className="text-base font-medium text-gray-500">Pular</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      <View className="px-6 pb-8">
        <View className="flex-row justify-center mb-8">
          {slides.map((_, index) => (
            <View
              key={index}
              className={`
                h-2 rounded-full mx-1
                ${index === currentIndex ? 'w-8 bg-black' : 'w-2 bg-gray-300'}
              `}
            />
          ))}
        </View>

        <Button
          title={currentIndex === slides.length - 1 ? 'Começar' : 'Próximo'}
          onPress={handleNext}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};
