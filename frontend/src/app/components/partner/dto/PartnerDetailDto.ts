import {PartnerRequestDto} from './PartnerRequestDto';
import {ActivityResponseDto} from '../../activity/dto/ActivityResponseDto';

export interface PartnerDetailDto extends PartnerRequestDto {
  activities: ActivityResponseDto[];
}
