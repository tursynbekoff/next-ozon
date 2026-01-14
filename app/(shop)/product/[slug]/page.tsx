 export default async function  Page({params}: {params: {slug: string}}) {

  const { slug } = await params;
  console.log('params', params);

  return (
    <div>
      <h1>{slug}</h1>
      <p>Card content</p>
    </div>
  )
}