interface ChatScreenProps {
  params: { id: string };
}
export default function ChatScreen({ params }: ChatScreenProps) {
  console.log(params);

  return <div>chat screen of{params.id}</div>;
}
