import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home({ pokemon }) {
  return (
    <Layout title='NextJS Pokedex'>
      <p>Hello pokedex!</p>
      <ul>
        {pokemon.map((poke, index) => (
          <li key={index}>
            <Link href='/'>
              <a>
                <Image src={poke.image} alt={poke.name} width={500} height={500} />
                <span>{index + 1}.</span>
                {poke.name}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps(context) {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const { results } = await response.json();

    const pokemon = results.map((result, index) => {
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`;

      return {
        ...result,
        image,
      };
    });

    return {
      props: { pokemon },
    };

  } catch (error) {
    console.error(error);
  }
};

