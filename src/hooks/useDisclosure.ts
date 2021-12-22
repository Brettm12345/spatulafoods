import {useCallback, useState} from 'react'

interface UseDisclosureProps {
  /** @default false */
  defaultIsOpen?: boolean
}

interface UseDisclosureReturn {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
  onToggle: () => void
}

type UseDisclosure = (props?: UseDisclosureProps) => UseDisclosureReturn
export const useDisclosure: UseDisclosure = ({defaultIsOpen = false}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)
  const onClose = () => {
    setIsOpen(false)
  }
  const onOpen = () => {
    setIsOpen(true)
  }
  const onToggle = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])
  return {
    isOpen,
    onToggle,
    onClose,
    onOpen,
  }
}
