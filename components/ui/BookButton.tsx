import { getBookingAction } from '@/lib/booking';
import { Button } from './Button';

type Props = Omit<React.ComponentProps<typeof Button>, 'href' | 'external' | 'children'> & {
  serviceId?: string;
  children?: React.ReactNode;
};

/** Every booking control goes through lib/booking so destinations stay consistent. */
export function BookButton({ serviceId, children = 'Book appointment', ...rest }: Props) {
  const action = getBookingAction(serviceId);
  return (
    <Button href={action.href} external={action.external} aria-label={action.hint ? `${typeof children === 'string' ? children : 'Book appointment'} — ${action.hint}` : undefined} {...rest}>
      {children}
    </Button>
  );
}
