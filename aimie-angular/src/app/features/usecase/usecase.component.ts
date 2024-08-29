import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { events } from './usecases';
import { chevronRightIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-usecase',
  templateUrl: './usecase.component.html',
  styleUrl: './usecase.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UsecaseComponent implements AfterViewInit {
  protected events = events;
  protected slideConfig = { slidesToShow: 1, slidesToScroll: 1, dots: true, infinite: true };
  protected chevronRightIcon = chevronRightIcon;

  constructor(protected route: ActivatedRoute) {}

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
    if (cat === 'scenario') {
      return temp[0].trim();
    } else if (cat === 'technology') {
      return temp[1].trim();
    }
    return temp[2].trim();
  }

  protected getZone(v: string): string {
    if (v === 'AI/ML-based Demand Forecasting') return 'SC';
    else if (v === 'AI-enabled Production Capacity Planning') return 'HQ';
    else if (v === 'Process Optimisation (Set Point)') return 'SHOPFLOOR';
    else if (v === 'Predictive & Prescriptive Maintenance') return 'SHOPFLOOR';
    else if (v === 'GenAI Maintenance Chatbot') return 'SHOPFLOOR';
    return 'UNKNOWN';
  }

  private changeBorderOfCards(): void {
    const elements = document.querySelectorAll('.k-card');
    elements.forEach(row => {
      if (row.innerHTML.includes('AI/ML-based Demand Forecasting')) {
        row.classList.add('zone--sc');
      } else if (row.innerHTML.includes('AI-enabled Production Capacity Planning')) {
        row.classList.add('zone--hq');
      } else if (row.innerHTML.includes('Process Optimisation (Set Point)')) {
        row.classList.add('zone--shopfloor');
      } else if (row.innerHTML.includes('Prescriptive Maintenance')) {
        row.classList.add('zone--shopfloor');
      } else if (row.innerHTML.includes('GenAI Maintenance Chatbot')) {
        row.classList.add('zone--shopfloor');
      }
    });
  }
}
