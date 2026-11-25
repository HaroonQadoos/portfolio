import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from "@react-email/components";

type Props = { name: string; email: string; message: string };

export default function ContactEmail({ name, email, message }: Props) {
  return (
    <Html>
      <Head />
      <Preview>{`New message from ${name}`}</Preview>
      <Body style={{ backgroundColor: "#f4f4f5", fontFamily: "Inter, Arial, sans-serif", padding: "24px 0" }}>
        <Container style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: 32, maxWidth: 560 }}>
          <Heading as="h2" style={{ margin: 0, fontSize: 20, color: "#111" }}>
            New portfolio message
          </Heading>
          <Section style={{ marginTop: 16 }}>
            <Text style={{ margin: 0, color: "#555" }}>
              <strong>From:</strong> {name}
            </Text>
            <Text style={{ margin: 0, color: "#555" }}>
              <strong>Email:</strong> {email}
            </Text>
          </Section>
          <Hr style={{ borderColor: "#e4e4e7", margin: "20px 0" }} />
          <Text style={{ whiteSpace: "pre-wrap", color: "#111", lineHeight: 1.6 }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
