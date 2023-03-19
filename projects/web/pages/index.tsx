import { Button } from "ui";
import Link from "next/link";
import Image from "next/image";

export default function Web(props: any) {
  console.log("props", props);
  return (
    <div>
      <h1>Web {props.a}</h1>
      <h1>Web {props.b}</h1>
      <h1>Web {props.c}</h1>
      <Button />
      <Link href="/posts/post1">Post1</Link>
      <Link href="/posts/post2">Post2</Link>
      <Link href="/posts/post2">Post3</Link>
    </div>
  );
}

export async function getStaticProps() {
  const props = {
    a: 1,
    b: 2,
    c: 3,
  };
  return { props };
}
