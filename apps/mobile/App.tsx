import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styled } from 'nativewind'; // <--- 引入 styled

// 使用 styled 包装基础组件，让它们支持 className
const StyledView = styled(View);
const StyledText = styled(Text);

export default function App() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-white">
      <StyledText className="text-3xl font-bold text-blue-500">
        MindWave App
      </StyledText>
      <StatusBar style="auto" />
    </StyledView>
  );
}