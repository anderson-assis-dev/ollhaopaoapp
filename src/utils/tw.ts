import { StyleSheet } from 'react-native';

export const tw = (className: string) => {
  const classes = className.split(' ');
  const styles: any[] = [];

  classes.forEach(cls => {
    if (styleMap[cls]) {
      styles.push(styleMap[cls]);
    }
  });

  return StyleSheet.flatten(styles);
};

const styleMap: Record<string, any> = {
  'flex-1': { flex: 1 },
  'flex-row': { flexDirection: 'row' },
  'items-center': { alignItems: 'center' },
  'justify-center': { justifyContent: 'center' },
  'justify-between': { justifyContent: 'space-between' },
  'bg-white': { backgroundColor: '#FFFFFF' },
  'bg-black': { backgroundColor: '#000000' },
  'bg-gray-50': { backgroundColor: '#F9FAFB' },
  'bg-gray-100': { backgroundColor: '#F3F4F6' },
  'bg-gray-200': { backgroundColor: '#E5E7EB' },
  'text-white': { color: '#FFFFFF' },
  'text-black': { color: '#000000' },
  'text-gray-600': { color: '#4B5563' },
  'px-6': { paddingHorizontal: 24 },
  'py-4': { paddingVertical: 16 },
  'p-4': { padding: 16 },
  'mb-4': { marginBottom: 16 },
  'rounded-full': { borderRadius: 9999 },
  'font-bold': { fontWeight: 'bold' },
  'text-lg': { fontSize: 18 },
  'text-base': { fontSize: 16 },
};
