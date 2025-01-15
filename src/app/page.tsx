'use client'
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          image: image,
          price: price,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setName('');
      setImage('');
      setPrice(0);


    } catch(error) {
      console.error('Error creating product:', error);
      alert('Error creando producto');
      setName('');
      setImage('');
      setPrice(0);

    }

    
  }

  return (
    <div>
        <Link href="/">Home</Link>
        <Link href="/products">lista de productos</Link>
      <nav>
      </nav>
      <form onSubmit={handleSubmit}>
        <h1>Crear productos</h1>
        <input type="text" placeholder="Nombre del producto" onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Precio del producto" onChange={(e) => setPrice(Number(e.target.value))} />
        <input type="text" placeholder="Url del producto" onChange={(e) => setImage(e.target.value)}/>
        <button type="submit">Crear</button>
        
      </form>
    </div>
    
  );
}
