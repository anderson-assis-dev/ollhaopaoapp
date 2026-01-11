import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Button } from '../components/Button';

interface RatingScreenProps {
  bakeryName: string;
  onSubmit: (rating: number, comment: string) => void;
  onSkip: () => void;
}

export const RatingScreen: React.FC<RatingScreenProps> = ({
  bakeryName,
  onSubmit,
  onSkip,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(rating, comment);
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 justify-center">
        <View className="mb-12">
          <Text className="text-4xl font-bold mb-2 text-center">
            Como foi sua experiência?
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            Sua opinião nos ajuda a melhorar
          </Text>
        </View>

        <View className="items-center mb-8">
          <Text className="text-base font-medium text-gray-700 mb-4">
            {bakeryName}
          </Text>

          <View className="flex-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
                className="px-2"
              >
                <Text className="text-5xl">
                  {star <= rating ? '⭐' : '☆'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {rating > 0 && (
            <Text className="text-base font-medium text-gray-700 mt-4">
              {rating === 1 && 'Ruim'}
              {rating === 2 && 'Poderia melhorar'}
              {rating === 3 && 'Bom'}
              {rating === 4 && 'Muito bom'}
              {rating === 5 && 'Excelente!'}
            </Text>
          )}
        </View>

        <View className="mb-8">
          <Text className="text-base font-medium text-gray-700 mb-2">
            Deixe um comentário (opcional)
          </Text>
          <TextInput
            className="bg-gray-50 rounded-xl p-4 min-h-[120px] text-base"
            placeholder="Conte-nos mais sobre sua experiência..."
            placeholderTextColor="#9CA3AF"
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <Button
          title="Enviar avaliação"
          onPress={handleSubmit}
          disabled={rating === 0}
          loading={loading}
          fullWidth
        />

        <TouchableOpacity
          onPress={onSkip}
          className="mt-4 py-3"
          activeOpacity={0.7}
        >
          <Text className="text-center text-gray-500 font-medium">
            Pular
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
