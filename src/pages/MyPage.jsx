import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchMyPage, withdraw } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import {
  Main,
  PageTitle,
  InfoList,
  InfoRow,
  InfoLabel,
  InfoValue,
  DangerZone,
  DangerTitle,
  DangerText,
  WithdrawButton,
} from './styles/MyPage.styles'

export default function MyPage() {
  const [info, setInfo] = useState(null)
  const [withdrawing, setWithdrawing] = useState(false)
  const { clearSession } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchMyPage().then(setInfo)
  }, [])

  const handleWithdraw = async () => {
    const confirmed = window.confirm(
      '정말 탈퇴하시겠어요? 지금까지의 할 일 기록이 모두 삭제되고 되돌릴 수 없습니다.'
    )
    if (!confirmed) return

    setWithdrawing(true)
    try {
      await withdraw()
      clearSession()
      navigate('/login', { replace: true })
    } finally {
      setWithdrawing(false)
    }
  }

  if (!info) return <Main>불러오는 중...</Main>

  return (
    <Main>
      <PageTitle>마이페이지</PageTitle>
      <InfoList>
        <InfoRow>
          <InfoLabel>이름</InfoLabel>
          <InfoValue>{info.userName}</InfoValue>
        </InfoRow>
      </InfoList>

      <DangerZone>
        <DangerTitle>계정 탈퇴</DangerTitle>
        <DangerText>탈퇴 시 모든 할 일 기록이 영구적으로 삭제되며 복구할 수 없습니다.</DangerText>
        <WithdrawButton type="button" onClick={handleWithdraw} disabled={withdrawing}>
          {withdrawing ? '처리 중...' : '계정 탈퇴'}
        </WithdrawButton>
      </DangerZone>
    </Main>
  )
}
