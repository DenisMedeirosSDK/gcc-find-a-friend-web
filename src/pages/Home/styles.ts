import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background: #f15156;
  padding: 0 112px;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1440px;
`

export const Logo = styled.img`
  margin-bottom: 136px;
  width: 215px;
  height: 56px;
`

export const HeroWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 136px;
`

export const Title = styled.p`
  font-weight: 800;
  font-size: 72px;
  line-height: 90%;
  letter-spacing: -0.02em;
  color: #ffffff;
`

export const SubTitle = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 34px;
  color: #ffffff;
`
export const SearchWrapper = styled.div`
  margin-top: 120px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`

export const ButtonSearch = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 32px;

  background: #f4d35e;
  color: #0d3b66;

  width: 72px;
  height: 72px;
  border-radius: 20px;
  border: none;

  img {
    width: 26px;
    height: 26px;
  }
`
