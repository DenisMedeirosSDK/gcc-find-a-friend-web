import { Select } from '@/components/Select'
import { api } from '@/lib/axios'
import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ButtonSearch,
  Container,
  HeroWrapper,
  Logo,
  SearchWrapper,
  SubTitle,
  Title,
  Wrapper
} from './styles'

interface ResponseStateDataApi {
  id: number
  sigla: string
  nome: string
  regiao: {
    id: number
    sigla: string
    nome: string
  }
}

interface ResponseStateApi {
  states: ResponseStateDataApi[]
}

interface SelectState {
  label: string
  value: string | number
}

interface ResponseCitiesDataApi {
  name: string
  code: string
}

interface ResponseCitiesApi {
  citys: ResponseCitiesDataApi[]
}

interface ResponsePetsDataApi {
  id: string
  name: string
  description: string
  city: string
  age: string
  energy: number
  size: string
  independence: string
  type: string
  photo: string
  orgId: string
  photo_url: string
}

interface ResponsePetsApi {
  pets: ResponsePetsDataApi[]
}

export function Home() {
  const [states, setStates] = useState<SelectState[]>([])
  const [cities, setCities] = useState<SelectState[]>([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [pets, setPets] = useState<ResponsePetsDataApi[]>([])

  const navigate = useNavigate()

  async function handleSearchPets() {
    if (!selectedCity || !selectedState) {
      return alert('Selecione um estado e uma cidade')
    }
    const fetchPets = await api.get<ResponsePetsApi>(`/pets/${selectedCity}`)

    setPets(fetchPets.data.pets)

    navigate(`/map`, {
      state: {
        state: selectedState,
        city: selectedCity,
        pets,
      },
    })
  }

  async function handleChangeState(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedState(event.target.value)
  }

  async function handleChangeCity(event: ChangeEvent<HTMLSelectElement>) {
    console.log(event.target.value)
    setSelectedCity(event.target.value)
  }

  useEffect(() => {
    async function fetchState() {
      const responseState = await api.get<ResponseStateApi>('/location/states')

      const parseStates: SelectState[] = responseState.data.states.map(
        (state) => {
          return {
            label: state.sigla,
            value: state.sigla,
          }
        },
      )

      setStates(parseStates)
      // setStates(responseState.data)
    }

    async function fetchCities() {
      if (selectedState.trim() === '') {
        return
      }

      const responseCities = await api.get<ResponseCitiesApi>(
        `/location/citys/${selectedState}`,
      )

      const parseCities: SelectState[] = responseCities.data.citys.map(
        (city) => {
          return {
            label: city.name,
            value: city.name,
          }
        },
      )

      setCities(parseCities)
    }
    fetchCities()
    fetchState()
  }, [cities, selectedState, selectedCity])

  return (
    <Container>
      <Wrapper>
        <Logo src="/public/logo_2.svg" alt="Find A Friend" />

        <HeroWrapper>
          <Title>{`Leve ${'\n'} a felicidade ${'\n'} para o seu lar`}</Title>
          <img src="/public/hero_dogs.svg" alt="Múltiplos cachorros" />
        </HeroWrapper>

        <SearchWrapper>
          <SubTitle>
            Encontre o animal de estimação ideal {'\n'} para seu estilo de vida!
          </SubTitle>
          <div>
            <Select
              name="state"
              label="Busque um amigo:"
              options={states}
              onChange={handleChangeState}
            />
            <Select
              name="city"
              label=""
              options={cities}
              onChange={handleChangeCity}
            />
            <ButtonSearch onClick={handleSearchPets}>
              <img src="/public/search_icon.svg" alt="Procurar amigo" />
            </ButtonSearch>
          </div>
        </SearchWrapper>
      </Wrapper>
    </Container>
  )
}
