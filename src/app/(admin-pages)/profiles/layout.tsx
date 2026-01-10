import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs/tabs";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Tabs defaultValue="pending">
      <TabsList>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
