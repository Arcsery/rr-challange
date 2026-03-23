import {PartnerStatus} from '../../enums/PartnerStatus';
import {QualificationType} from '../../enums/QualificationType';

export interface PartnerResponseDto {
  id: number;
  name: string;
  taxNumber: string;
  headquarters: string;
  status: PartnerStatus;
  qualifications: QualificationType[];
}
