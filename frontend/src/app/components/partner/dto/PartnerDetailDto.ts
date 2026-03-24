import {ActivityResponseDto} from '../../activity/dto/ActivityResponseDto';
import {PartnerResponseDto} from './PartnerResponseDto';

export interface PartnerDetailDto extends PartnerResponseDto {
  activities: ActivityResponseDto[];
}
