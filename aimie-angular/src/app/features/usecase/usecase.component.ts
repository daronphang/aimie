import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { events } from './usecases';
import { chevronRightIcon } from '@progress/kendo-svg-icons';
import { preloadImages } from '@core/utils/formatters';

@Component({
  selector: 'app-usecase',
  templateUrl: './usecase.component.html',
  styleUrl: './usecase.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UsecaseComponent implements OnInit, AfterViewInit {
  protected events = events;
  protected slideConfig = { slidesToShow: 1, slidesToScroll: 1, dots: true, infinite: true };
  protected chevronRightIcon = chevronRightIcon;

  constructor(protected route: ActivatedRoute) {}

  ngOnInit(): void {
    const images: string[] = [
      '/assets/images/uc-demand-forecasting.png',
      '/assets/images/uc-sc-planning.png',
      '/assets/images/uc-procurement.png',
      '/assets/images/uc-capacity-planning.png',
      '/assets/images/uc-copilot.png',
      '/assets/images/uc-ppm.png',
      '/assets/images/uc-logistics.png',
    ];
    preloadImages(images);
  }

  ngAfterViewInit(): void {
    this.changeContentOfTimelineFlags();
    this.changeBorderOfCards();
  }

  private changeContentOfTimelineFlags(): void {
    const elements = document.querySelectorAll('.k-timeline-flag');
    elements.forEach(row => {
      if (row.innerHTML === '2011') {
        row.innerHTML = 'Supply Chain';
      } else if (row.innerHTML === '2012') {
        row.innerHTML = 'Procurement';
      } else if (row.innerHTML === '2013') {
        row.innerHTML = 'Production';
      } else if (row.innerHTML === '2014') {
        row.innerHTML = 'Maintenance';
      } else if (row.innerHTML === '2015') {
        row.innerHTML = 'Quality';
      } else if (row.innerHTML === '2016') {
        row.innerHTML = 'Delivery';
      }
    });
  }

  protected extractCategoryFromDescription(v: string, cat: string): string {
    const temp = v.split(';');
    if (cat === 'mainUser') {
      return temp[0].trim();
    } else if (cat === 'problem') {
      return temp[1].trim();
    }
    return temp[2].trim();
  }

  protected getZone(v: string): string {
    if (v === 'AI-enabled Demand Forecasting') return 'SC';
    else if (v === 'Integrated Supply Chain Planning') return 'SC';
    else if (v === 'AI-enabled Procurement') return 'HQ';
    else if (v === 'AI-enabled Production Capacity Planning') return 'HQ';
    else if (v === 'Industrial Copilot') return 'SHOPFLOOR';
    else if (v === 'Predictive and Prescriptive Maintenance') return 'SHOPFLOOR';
    else if (v === 'Gen-AI Logistics for Customer Service') return 'SC';
    return 'UNKNOWN';
  }

  private changeBorderOfCards(): void {
    const elements = document.querySelectorAll('.k-card');
    elements.forEach(row => {
      if (row.innerHTML.includes('AI-enabled Demand Forecasting')) {
        row.classList.add('zone--sc');
      } else if (row.innerHTML.includes('Integrated Supply Chain Planning')) {
        row.classList.add('zone--sc');
      } else if (row.innerHTML.includes('AI-enabled Procurement')) {
        row.classList.add('zone--hq');
      } else if (row.innerHTML.includes('AI-enabled Production Capacity Planning')) {
        row.classList.add('zone--hq');
      } else if (row.innerHTML.includes('Industrial Copilot')) {
        row.classList.add('zone--shopfloor');
      } else if (row.innerHTML.includes('Prescriptive Maintenance')) {
        row.classList.add('zone--shopfloor');
      } else if (row.innerHTML.includes('Gen-AI Logistics for Customer Service')) {
        row.classList.add('zone--sc');
      }
    });
  }
}
