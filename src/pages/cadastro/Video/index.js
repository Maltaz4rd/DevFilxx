import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import useForm from '../../../hooks/useForm';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';
import { ButtonWrapper } from '../styles';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map(({ titulo }) => titulo);

  const { handleChange, values } = useForm({
    titulo: '',
    url: '',
    categoria: '',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  return (
    <PageDefault>
      <h1>Registrar novo video</h1>
      <form onSubmit={(event) => {
        event.preventDefault();

        const categoriaEscolhida = categorias.find((categoria) => {
          return categoria.titulo === values.categoria;
        });
    
        if (!categoriaEscolhida) {
          alert('Selecione uma categoria existente ou se preferir crie uma nova categoria!');
        } else {
          videosRepository.create({
            titulo: values.titulo,
            url: values.url,
            categoriaId: categoriaEscolhida.id,
          })
            .then(() => {
              console.log('Registrado com sucesso!');
              history.push('/');
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }}
      >
        <FormField
          label="Titulo"
          name="titulo"
          value={values.titulo}
          onChange={handleChange}
        />

        <FormField
          label="URL(Link do video)"
          name="url"
          value={values.url}
          onChange={handleChange}
        />

        <FormField
          label="Categoria"
          name="categoria"
          value={values.categoria}
          onChange={handleChange}
          suggestions={categoryTitles}
        />
        <ButtonWrapper>
          <Button type="submit">
            Registrar
          </Button>
          <Link to="/cadastro/categoria">
            <Button type="submit">
              Registrar nova categoria
            </Button>
          </Link>
        </ButtonWrapper>
      </form>
    </PageDefault>
  );
}

export default CadastroVideo;
